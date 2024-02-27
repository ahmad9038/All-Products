import Product from "@/app/(models)/product";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Delete the product
    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Product successfully deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      { status: 500 }
    );
  }
}
