import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const { name, email, role } = body;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updateData: {
      name?: string;
      email?: string;
      role?: string;
    } = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
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
    const id = Number(params.id);

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
