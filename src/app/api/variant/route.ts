import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const variants = await prisma.variant.findMany({
      include: {
        product: true,
        brand: true,
        category: true,
      },
    });
    return NextResponse.json(variants);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body) {
      return NextResponse.json(
        { message: "Request body is required" },
        { status: 400 }
      );
    }

    const {
      name,
      productId,
      brandId,
      categoryId,
      imageUrl,
      price,
      quantity,
      status = "In Stock",
    } = body;

    // Required field validation
    if (!name || !brandId || !categoryId || !price || quantity === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the variant
    const newVariant = await prisma.variant.create({
      data: {
        name,
        productId: productId || null,
        brandId: Number(brandId),
        categoryId: Number(categoryId),
        imageUrl: imageUrl || "",
        price: Number(price),
        quantity: Number(quantity),
        status,
      },
    });

    return NextResponse.json(newVariant, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
