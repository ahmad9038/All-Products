"use client";

import Search from "./(components)/Search";
import { useContextApi } from "./(context)/context";
import ProductCard from "./(components)/ProductCard";
import Pagination from "./(components)/Pagination";

export default function Home() {
  const { products, productsLoading, totalPages } = useContextApi();
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="px-3 sm:px-5  w-full  min-h-screen">
          <div className=" flex items-center flex-col w-full  lg:w-[90%] md:w-[90%] mx-auto">
            <h1 className="text-4xl text-white lg:text-5xl font-bold text-center py-8 mb-5">
              All Products from Videos
            </h1>

            <div className=" w-full mb-5">
              <Search />
            </div>

            {productsLoading ? (
              <div className=" text-wrap text-white mt-10 text-3xl">
                Loading....
              </div>
            ) : (
              <div className="  gap-2 w-full sm:gap-3 md:gap-5 grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 ">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            )}
          </div>

          {productsLoading || totalPages <= 1 ? <></> : <Pagination />}
        </div>
      </div>
    </main>
  );
}
