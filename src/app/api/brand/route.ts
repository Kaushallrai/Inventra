import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brand = await prisma.brand.findMany({
      include: {
        products: true,
      },
    });
    return NextResponse.json(brand, { status: 200 });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
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

    const newBrand = await prisma.brand.create({
      data: { name },
    });
    return NextResponse.json(newBrand, { status: 201 });
  } catch (error) {
    console.error("Error creating brand:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
