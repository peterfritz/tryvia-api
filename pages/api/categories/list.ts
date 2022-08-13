import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { categories } from "../../../data";

type Categories = {
  id: number;
  name: string;
};

type Data = {
  trivia_categories: Categories[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json({
        trivia_categories: categories,
      });

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);

      break;
  }
};

export default handler;
