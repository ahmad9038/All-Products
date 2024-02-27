import Product from "@/app/(models)/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let products;
    // const search = await req;
    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get("page"));
    const limit = parseInt(searchParams.get("limit"));
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const total = await Product.countDocuments();

    const { search } = await req.json();

    if (search.trim() !== "") {
      // Find products that match the search term
      products = await Product.find({
        name: { $regex: new RegExp(search), $options: "i" },
      });
    } else {
      // If no search term or search term is empty, return all products
      // products = await Product.find();
      products = await Product.find({});
    }

    let data = products.slice(startIndex, lastIndex);
    let pageCount = Math.ceil(total / limit);

    return NextResponse.json(
      {
        products: data,
        total,
        pageCount,
        next: { page: page + 1 },
        prev: { page: page - 1 },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
