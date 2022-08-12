import type { NextApiRequest, NextApiResponse } from "next";
import { array, object, string } from "yup";
import { categories, difficulties, types } from "../../../data";
import prisma from "../../../lib/prisma";

const questionSchema = object({
  category: string().oneOf(categories).required(),
  type: string().oneOf(types).required(),
  difficulty: string().oneOf(difficulties).required(),
  question: string().required(),
  correct_answer: string().required(),
  incorrect_answers: array().of(string().required()).min(1).required(),
});

type Data = {
  ok: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    method,
    body: {
      category,
      type,
      difficulty,
      question,
      correct_answer,
      incorrect_answers,
    },
  } = req;

  switch (method) {
    case "POST":
      try {
        await questionSchema.validate({
          category,
          type,
          difficulty,
          question,
          correct_answer,
          incorrect_answers,
        });

        await prisma.question.create({
          data: {
            category,
            type,
            difficulty,
            question,
            correct_answer,
            incorrect_answers,
          },
        });

        res.status(200).json({
          ok: true,
        });
      } catch (err) {
        console.error(err);
        res.status(400).json({
          ok: false,
        });
      }

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);

      break;
  }
};

export default handler;
