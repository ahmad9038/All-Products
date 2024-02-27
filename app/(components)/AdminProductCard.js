"use client";

import Link from "next/link";
import React, { useState } from "react";
import UpdateModal from "./UpdateModal";
import { useContextApi } from "../(context)/context";

const AdminProductCard = ({ product }) => {
  const { loadProducts } = useContextApi();
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/deleteProduct", {
        method: "DELETE",
        body: JSON.stringify({
          id: product._id,
        }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("failed to create ticket");
      }

      const data = await res.json();

      if (res.status !== 201) {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setConfirmDelete(false);
      loadProducts();
    }
  };

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

      <div className=" flex gap-2 mb-2">
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className=" bg-red-400 font-bold px-3 text-sm text-white rounded-md"
          >
            D
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={() => handleDelete()}
            className=" bg-red-400 font-bold px-3 text-sm text-white rounded-md"
          >
            C
          </button>
        )}

        <UpdateModal product={product} />
      </div>
    </div>
  );
};

export default AdminProductCard;
