import Product from "@/app/(models)/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id, name, imageLink, ProductLink } = await req.json();

    // Find the product by id
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    product.name = name;
    product.imageLink = imageLink;
    product.ProductLink = ProductLink;

    const updatedProduct = await product.save();

    return NextResponse.json(updatedProduct, {
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
