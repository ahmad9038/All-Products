import React from "react";
import { useContextApi } from "../(context)/context";

const Search = () => {
  const { setSearch, search, setCurrentPage } = useContextApi();

  return (
    <div className="flex flex-col justify-center items-center">
      <p className=" text-white text-sm mb-1">Search Products with names</p>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className=" outline-none w-full sm:w-1/2 lg:w-1/3 p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Search;
