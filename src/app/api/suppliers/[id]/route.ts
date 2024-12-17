import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, contact, email, address } = body;

    const updatedSupplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data: {
        name,
        contact,
        email,
        address,
      },
    });

    return NextResponse.json(updatedSupplier, { status: 200 });
  } catch (error) {
    console.error("Error updating supplier:", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 404 }
      );
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
    const { id } = params;

    await prisma.supplier.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Supplier deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting supplier:", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
