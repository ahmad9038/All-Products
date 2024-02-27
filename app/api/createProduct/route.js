import Product from "@/app/(models)/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, imageLink, ProductLink } = await req.json();

    const product = new Product({
      name,
      imageLink,
      ProductLink,
    });

    const createdProduct = await product.save();

    return NextResponse.json(createdProduct, {
      status: 201,
    });
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
