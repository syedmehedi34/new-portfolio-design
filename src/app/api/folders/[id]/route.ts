// src/app/api/folders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Folder from "@/models/folder.model";
import Book from "@/models/book.model";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const update: Record<string, unknown> = {};
    if (body.name !== undefined) update.name = body.name.trim();
    if (body.color !== undefined) update.color = body.color;
    if (body.logo !== undefined) update.logo = body.logo;
    if (body.order !== undefined) update.order = body.order;
    if (body.parentId !== undefined) update.parentId = body.parentId;

    const folder = await Folder.findByIdAndUpdate(id, update, { new: true });
    if (!folder) {
      return NextResponse.json(
        { error: "ফোল্ডার পাওয়া যায়নি" },
        { status: 404 },
      );
    }

    return NextResponse.json({ folder });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "ফোল্ডার আপডেট করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;

    const folder = await Folder.findById(id);
    if (!folder) {
      return NextResponse.json(
        { error: "ফোল্ডার পাওয়া যায়নি" },
        { status: 404 },
      );
    }

    // ডিলিট করলে ভিতরের বই ও সাব-ফোল্ডার parent ফোল্ডারে move হয়ে যাবে (data loss হবে না)
    await Book.updateMany({ folderId: id }, { folderId: folder.parentId });
    await Folder.updateMany({ parentId: id }, { parentId: folder.parentId });
    await Folder.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "ফোল্ডার ডিলিট করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}
