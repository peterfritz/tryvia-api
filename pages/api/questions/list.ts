import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";
import rateLimit from "../../../lib/rate-limit";
import { categories, difficulties, types } from "../../../data";
import { number, object, string } from "yup";

const querySchema = object({
  amount: number().positive().integer().required(),
  token: string()
    .transform((value) => (value === "0" || value === 0 ? null : value))
    .nullable(),
  category: number()
    .positive()
    .integer()
    .oneOf([null, ...categories.map(({ id }) => id)])
    .transform((value) => (value === "0" || value === 0 ? null : value))
    .nullable(),
  type: string()
    .oneOf([null, ...types])
    .transform((value) => (value === "0" || value === 0 ? null : value))
    .nullable(),
  difficulty: string()
    .oneOf([null, ...difficulties])
    .transform((value) => (value === "0" || value === 0 ? null : value))
    .nullable(),
});

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type Data = {
  response_code: number;
  results: Question[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  try {
    await limiter.check(res, 25, "CACHE_TOKEN");

    const { method, query } = req;

    try {
      await querySchema.validate(query);
    } catch (err) {
      return res.json({
        response_code: 1,
        results: [],
      });
    }

    switch (method) {
      case "GET":
        try {
          const { amount, token, category, type, difficulty } =
            querySchema.cast(query);

          if (Number(amount) < 1 || Number(amount) > 25) {
            return res.status(200).json({
              response_code: 2,
              results: [],
            });
          }

          if (token) {
            const tokenData = jwt.verify(
              String(token),
              String(process.env.SECRET_KEY)
            );

            if (typeof tokenData !== "object" || tokenData.id) {
              return res.status(200).json({
                response_code: 3,
                results: [],
              });
            }
          }

          const conditions = [
            ...(category
              ? [
                  `category = '${
                    categories.find(({ id }) => id === category)?.name
                  }'`,
                ]
              : []),
            ...(type ? [`type = '${type}'`] : []),
            ...(difficulty ? [`difficulty = '${difficulty}'`] : []),
          ];

          const sqlQuery = [
            "SELECT * FROM Question",
            ...(conditions.length ? [`WHERE ${conditions.join(" AND ")}`] : []),
            "ORDER BY RAND()",
            `LIMIT ${Number(amount)};`,
          ].join(" ");

          const questions: Question[] = await prisma.$queryRawUnsafe(sqlQuery);

          return res.status(200).json({
            response_code: 0,
            results: questions.map(
              ({
                category,
                type,
                difficulty,
                question,
                correct_answer,
                incorrect_answers,
              }) => ({
                category,
                type,
                difficulty,
                question,
                correct_answer,
                incorrect_answers,
              })
            ),
          });
        } catch (err) {
          console.error(err);
          return res.status(200).json({
            response_code: 3,
            results: [],
          });
        }
      default:
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch {
    return res.status(429).json({
      response_code: 3,
      results: [],
    });
  }
};

export default handler;
