import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

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
    const formData = await req.formData();

    // Parse and validate the incoming data
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const productId = formData.get("productId") as string;
    const categoryId = formData.get("categoryId") as string;
    const brandId = formData.get("brandId") as string;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const status = (formData.get("status") as string) || "In Stock";

    // Required field validation
    if (!name || !brandId || !categoryId || !price || !quantity) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Handle image upload
    let imageUrl = "";
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate a unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename =
        image.name + "-" + uniqueSuffix + path.extname(image.name);

      // Save the file
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await writeFile(path.join(uploadDir, filename), buffer);

      // Set the imageUrl
      imageUrl = `/uploads/${filename}`;
    }

    // Create the variant
    const newVariant = await prisma.variant.create({
      data: {
        name,
        productId: productId ? Number(productId) : null,
        brandId: Number(brandId),
        categoryId: Number(categoryId),
        imageUrl,
        price: Number(price),
        quantity: Number(quantity),
        status,
      },
    });

    return NextResponse.json(newVariant, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/variant:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
