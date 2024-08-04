// pages/api/update-json.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(req: Request) {
  try {
    const filepath = path.resolve(process.cwd(), "Data", "Banner.json");
    const newData = await req.json();

    const fileContent = fs.readFileSync(filepath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    const index = jsonData.findIndex((item: any) => item.id === newData.id);

    if (index !== -1) {
      jsonData[index] = { ...jsonData[index], ...newData };
    } else {
      console.log("not found");
    }
    fs.writeFileSync(filepath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json(
      { message: `Data updated successfully`, data: newData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating JSON file:", error);
    return NextResponse.json(
      { message: "Error updating JSON file", error: error.message },
      { status: 500 }
    );
  }
}
