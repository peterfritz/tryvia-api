import { categories, difficulties, types } from "@/data/settings";
import db from "@/db";
import { questions } from "@/db/questions/schema";
import { env } from "@/env/server";
import { RouteSegmentConfig } from "@/types";
import { and, eq, sql } from "drizzle-orm";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime: RouteSegmentConfig["runtime"] = "edge";

type Category = (typeof categories)[number];
type Type = (typeof types)[number];
type Difficulty = (typeof difficulties)[number];

const searchParamsSchema = z.object({
  amount: z.coerce.number().positive().int(),
  category: z
    .union([
      z.literal(null),
      z.literal("0"),
      ...categories.map((category) => z.literal(String(category.id))),
    ])
    .transform<null | Category["id"]>((value) =>
      !value || value === "0" ? null : (Number(value) as Category["id"])
    )
    .nullable(),
  type: z
    .union([
      z.literal(null),
      z.literal("0"),
      ...types.map((type) => z.literal(type)),
    ])
    .transform<null | Type>((value) =>
      !value || value === "0" ? null : (value as Type)
    )
    .nullable(),
  difficulty: z
    .union([
      z.literal(null),
      z.literal("0"),
      ...difficulties.map((difficulty) => z.literal(difficulty)),
    ])
    .transform<null | Difficulty>((value) =>
      !value || value === "0" ? null : (value as Difficulty)
    )
    .nullable(),
  token: z
    .string()
    .transform<null | string>((value) =>
      !value || value === "0" ? null : value
    )
    .nullable(),
});

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;

  const parsedSearchParams = searchParamsSchema.safeParse({
    amount: searchParams.get("amount"),
    type: searchParams.get("type"),
    category: searchParams.get("category"),
    difficulty: searchParams.get("difficulty"),
    token: searchParams.get("token"),
  });

  if (!parsedSearchParams.success) {
    console.error(parsedSearchParams.error.errors);

    return NextResponse.json({
      response_code: 1,
      results: [],
    });
  }

  const { amount, category, type, difficulty, token } = parsedSearchParams.data;

  if (token) {
    try {
      const data = await jwtVerify(
        token,
        new TextEncoder().encode(env.SECRET_KEY)
      );

      if (!data.payload.id) {
        throw new Error("Invalid token");
      }
    } catch (_error) {
      return NextResponse.json({
        response_code: 3,
        results: [],
      });
    }
  }

  const conditions: ReturnType<typeof eq>[] = [];

  if (type) {
    conditions.push(eq(questions.type, type));
  }

  if (category) {
    const name = categories.find(({ id }) => id === category)?.name || "";

    conditions.push(eq(questions.category, name));
  }

  if (difficulty) {
    conditions.push(eq(questions.difficulty, difficulty));
  }

  const results = await db
    .select({
      category: questions.category,
      type: questions.type,
      difficulty: questions.difficulty,
      question: questions.question,
      correct_answer: questions.correctAnswer,
      incorrect_answers: questions.incorrectAnswers,
    })
    .from(questions)
    .where(and(...conditions))
    .limit(amount)
    .orderBy(sql`RANDOM()`);

  return NextResponse.json({
    response_code: 0,
    results,
  });
};
