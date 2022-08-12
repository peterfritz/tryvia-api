import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";
import rateLimit from "../../../lib/rate-limit";

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

    const {
      method,
      query: { amount, token },
    } = req;

    switch (method) {
      case "GET":
        try {
          if (Number(amount) < 1 || Number(amount) > 25) {
            res.status(200).json({
              response_code: 2,
              results: [],
            });
          }

          if (token && token !== "0") {
            const tokenData = jwt.verify(
              String(token),
              String(process.env.SECRET_KEY)
            );

            if (typeof tokenData !== "object" || tokenData.id) {
              res.status(200).json({
                response_code: 3,
                results: [],
              });
            }
          }

          const questions: Question[] =
            await prisma.$queryRaw`SELECT * FROM Question ORDER BY RAND() LIMIT ${Number(
              amount
            )};`;

          res.status(200).json({
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
          res.status(200).json({
            response_code: 3,
            results: [],
          });
        }

        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);

        break;
    }
  } catch {
    res.status(429).json({
      response_code: 3,
      results: [],
    });
  }
};

export default handler;
