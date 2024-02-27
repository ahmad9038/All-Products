"use client";

import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div
      href=""
      className=" flex-col w-full h-full   flex items-center justify-end bg-white shadow-lg rounded-md"
    >
      <Link href={product.ProductLink}>
        <div className=" w-full p-1 sm:p-2  overflow-hidden  flex flex-col  justify-between items-center ">
          <div className="w-[100%] h-[120px] sm:h-[200px] relative">
            <img
              className="object-contain w-full h-full"
              src={product.imageLink}
              alt={product.name}
            />
          </div>
          <div className=" text-center text-[10px] sm:text-sm ">
            {product.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
