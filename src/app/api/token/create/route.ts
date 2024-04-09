import { env } from "@/env/server";
import { RouteSegmentConfig } from "@/types";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export const runtime: RouteSegmentConfig["runtime"] = "edge";

export const POST = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;

  const command = searchParams.get("command");

  if (command !== "request") {
    return Response.json({}, { status: 200 });
  }

  const token = await new SignJWT({
    id: nanoid(),
  })
    .setExpirationTime("6 hours")
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(env.SECRET_KEY));

  return Response.json(
    {
      response_code: 0,
      response_message: "Token Generated Successfully!",
      token,
    },
    { status: 200 }
  );
};
