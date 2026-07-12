// src/app/api/folders/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Folder from "@/models/folder.model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const parentId = searchParams.get("parentId"); // "null" | id | absent(=all, flat list)

    const filter: Record<string, unknown> = {};
    if (parentId === "null") filter.parentId = null;
    else if (parentId) filter.parentId = parentId;

    const folders = await Folder.find(filter)
      .sort({ order: 1, name: 1 })
      .lean();
    return NextResponse.json({ folders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "ফোল্ডার লোড করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "ফোল্ডারের নাম আবশ্যক" },
        { status: 400 },
      );
    }

    const folder = await Folder.create({
      name: body.name.trim(),
      parentId: body.parentId || null,
      color: body.color || "#5B6BF5",
      logo: body.logo || undefined,
      order: body.order ?? 0,
    });

    return NextResponse.json({ folder }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "ফোল্ডার তৈরি করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}
