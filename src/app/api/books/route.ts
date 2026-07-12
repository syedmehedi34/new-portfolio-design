// src/app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/book.model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const view = searchParams.get("view") ?? "raw"; // "folder" | "raw"
    const folderId = searchParams.get("folderId"); // "null" | id
    const search = searchParams.get("search")?.trim();
    const status = searchParams.get("status");
    const favorite = searchParams.get("favorite");

    const filter: Record<string, unknown> = {};

    if (view === "folder") {
      filter.folderId = folderId === "null" || !folderId ? null : folderId;
    }

    if (status && status !== "all") {
      filter.readingStatus = status;
    }

    if (favorite === "true") {
      filter.isFavorite = true;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { bookName: regex },
        { authorName: regex },
        { category: regex },
        { tags: regex },
      ];
    }

    const books = await Book.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ books });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "বই লোড করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.bookName?.trim()) {
      return NextResponse.json({ error: "বইয়ের নাম আবশ্যক" }, { status: 400 });
    }
    if (!body.pdfUrl?.trim()) {
      return NextResponse.json(
        { error: "Google Drive লিংক আবশ্যক" },
        { status: 400 },
      );
    }
    if (!body.authorName || body.authorName.length === 0) {
      return NextResponse.json(
        { error: "অন্তত একজন লেখকের নাম দিন" },
        { status: 400 },
      );
    }

    const book = await Book.create({
      ...body,
      folderId: body.folderId || null,
    });

    return NextResponse.json({ book }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "বই তৈরি করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}
