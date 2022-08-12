import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

type Data = {
  response_code?: number;
  response_message?: string;
  token?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const {
    method,
    query: { command },
  } = req;

  switch (method) {
    case "GET":
      try {
        if (command !== "request") {
          res.status(200).json({});
        }

        const token = jwt.sign(
          {
            id: randomUUID(),
          },
          String(process.env.SECRET_KEY),
          { expiresIn: "6h" }
        );

        res.status(200).json({
          response_code: 0,
          response_message: "Token Generated Successfully!",
          token,
        });
      } catch (err) {
        console.error(err);
        res.status(200).json({});
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);

      break;
  }
};

export default handler;
