import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const tmpFilepath = path.join("/tmp", "Banner.json");
    if (!fs.existsSync(tmpFilepath)) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }
    const fileContent = fs.readFileSync(tmpFilepath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    return NextResponse.json(jsonData, { status: 200 });
  } catch (error: any) {
    console.error("error reading the JSON File", error);
  }
}
