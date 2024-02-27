"use client";

const { createContext, useState, useEffect, useContext } = require("react");

const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [productsLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const product = await fetch(
        `/api/getProducts?page=${currentPage}&limit=25`,
        {
          method: "POST",
          body: JSON.stringify({
            search,
          }),
        }
      );
      const data = await product.json();
      setProducts(data.products);
      setTotalPages(data.pageCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [search, currentPage]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        products,
        setSearch,
        productsLoading,
        totalPages,
        currentPage,
        setCurrentPage,
        loadProducts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => {
  return useContext(Context);
};
