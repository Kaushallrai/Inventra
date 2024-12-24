import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const variantId = parseInt(params.id);
    const formData = await req.formData();

    // Parse and validate the incoming data
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const brandId = formData.get("brandId") as string;
    const price = formData.get("price") as string;

    // Required field validation
    if (!name || !brandId || !price) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Handle image upload if a new image is provided
    let imageUrl;
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

    // Update the variant
    const updatedVariant = await prisma.variant.update({
      where: { id: variantId },
      data: {
        name,
        brandId: Number(brandId),
        price: Number(price),
        ...(imageUrl && { imageUrl }),
      },
    });

    return NextResponse.json(updatedVariant, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api/variant/[id]:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const variantId = parseInt(params.id);

    // Delete the variant
    await prisma.variant.delete({
      where: { id: variantId },
    });

    return NextResponse.json(
      { message: "Variant deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/variant/[id]:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
