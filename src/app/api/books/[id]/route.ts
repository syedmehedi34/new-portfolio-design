// src/app/api/books/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/book.model";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    delete body._id;

    const book = await Book.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return NextResponse.json({ error: "বই পাওয়া যায়নি" }, { status: 404 });
    }

    return NextResponse.json({ book });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "বই আপডেট করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return NextResponse.json({ error: "বই পাওয়া যায়নি" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "বই ডিলিট করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}
