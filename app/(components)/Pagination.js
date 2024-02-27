import React from "react";
import { useContextApi } from "../(context)/context";

const Pagination = () => {
  const { totalPages, currentPage, setCurrentPage } = useContextApi();

  const getNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex mx-auto w-[220px] items-center justify-between mt-10 pb-8">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        onClick={() => getPrevPage()}
      >
        Previous
      </button>
      <div className=" flex flex-col items-center justify-center">
        <p className=" text-center text-white">page</p>
        <p className="text-center text-white">{`${currentPage} of ${totalPages}`}</p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        onClick={() => getNextPage()}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
