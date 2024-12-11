// src/app/api/categories/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Create a new category
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing category
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json(
        { message: "ID and name are required" },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a category
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await prisma.category.delete({
      where: { id: Number(id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
