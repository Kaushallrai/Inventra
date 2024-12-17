import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      select: {
        id: true,
        name: true,
        contact: true,
        email: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, email, address } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const newSupplier = await prisma.supplier.create({
      data: {
        name,
        contact,
        email,
        address,
      },
    });

    return NextResponse.json(newSupplier, { status: 201 });
  } catch (error) {
    console.error("Error creating supplier:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Supplier with this name already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
