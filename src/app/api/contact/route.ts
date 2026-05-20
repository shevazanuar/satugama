import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define form structure
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  style: string;
  budget: string;
  message: string;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, style, budget, message } = body;

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    const newSubmission: ContactSubmission = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      style: style || "2d-pixel",
      budget: budget || "under-500k",
      message,
      timestamp: new Date().toISOString()
    };

    // Save to src/data/submissions.json
    const dataDir = path.join(process.cwd(), "src", "data");
    const filePath = path.join(dataDir, "submissions.json");

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let submissions: ContactSubmission[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        submissions = JSON.parse(fileContent);
      } catch (err) {
        console.error("Error reading submissions file, resetting", err);
        submissions = [];
      }
    }

    submissions.push(newSubmission);
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, message: "Request penawaran berhasil dikirim!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}
