import React, { useState } from "react";
import { useContextApi } from "../(context)/context";

const UpdateModal = ({ product }) => {
  const { loadProducts } = useContextApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState(product.name);
  const [productLink, setProductLink] = useState(product.ProductLink);
  const [productImage, setProductImage] = useState(product.imageLink);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/updateProduct", {
        method: "POST",
        body: JSON.stringify({
          id: product._id,
          name: productName,
          imageLink: productImage,
          ProductLink: productLink,
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
      closeModal();
      loadProducts();
    }
  };

  return (
    <div className="">
      <button
        disabled={loading}
        onClick={openModal}
        className="bg-green-400 text-sm font-bold px-3 py-2 text-black rounded-md"
      >
        U
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <input
              type="text"
              placeholder="Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="block w-full mb-4 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Product Link"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              className="block w-full mb-4 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Product Image Link"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              className="block w-full mb-4 px-3 py-2 border rounded-md"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            <button
              onClick={closeModal}
              className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateModal;
