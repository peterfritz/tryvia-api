import { NextResponse } from "next/server";

export const GET = () =>
  NextResponse.redirect(
    "https://github.com/peterfritz/tryvia-api?tab=readme-ov-file#readme"
  );
