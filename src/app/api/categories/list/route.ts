import { categories } from "@/data/settings";
import { RouteSegmentConfig } from "@/types";
import { NextResponse } from "next/server";

export const runtime: RouteSegmentConfig["runtime"] = "edge";

export const GET = async () =>
  NextResponse.json({
    trivia_categories: categories,
  });
