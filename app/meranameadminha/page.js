"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useContextApi } from "../(context)/context";
import Search from "../(components)/Search";
import AdminProductCard from "../(components)/AdminProductCard";
import Pagination from "../(components)/Pagination";

const AdminPage = () => {
  const { products, productsLoading, loadProducts } = useContextApi();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productImage: "",
    productLink: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("/api/createProduct", {
        method: "POST",
        body: JSON.stringify({
          name: newProduct.productName,
          imageLink: newProduct.productImage,
          ProductLink: newProduct.productLink,
        }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("failed to create ticket");
      }

      router.push("/meranameadminha");

      setNewProduct({
        productName: "",
        productImage: "",
        productLink: "",
      });
    } catch (error) {
    } finally {
      setLoading(false);
      loadProducts();
    }
  };

  return (
    <>
      <div className="px-3 sm:px-5  w-full  h-screen">
        <div className=" flex items-center flex-col w-full  lg:w-[90%] md:w-[90%] mx-auto">
          <form
            onSubmit={handleSubmit}
            className=" mt-5 mb-4 max-w-full md:max-w-[800px] w-full"
          >
            <div className="mb-2">
              <label className="block text-white text-sm font-bold mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={newProduct.productName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label className="block text-white text-sm font-bold mb-2">
                Product Image Link
              </label>
              <input
                type="text"
                name="productImage"
                value={newProduct.productImage}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Product Link
              </label>
              <input
                type="text"
                name="productLink"
                value={newProduct.productLink}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {newProduct.productName === "" ||
            newProduct.productImage === "" ||
            newProduct.productLink === "" ? (
              <></>
            ) : (
              <>
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Product
                </button>
              </>
            )}
          </form>

          <div className=" w-full mb-5">
            <Search />
          </div>

          {productsLoading ? (
            <div className=" text-wrap text-white mt-10 text-3xl">
              Loading....
            </div>
          ) : (
            <div className=" gap-2 w-full sm:gap-3 md:gap-5 grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 ">
              {products.map((product, index) => (
                <AdminProductCard key={index} product={product} />
              ))}
            </div>
          )}
        </div>

        {productsLoading ? <></> : <Pagination />}
      </div>
    </>
  );
};

export default AdminPage;
