import React from "react";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products, isProductsLoading } = useAppContext();


  const bestSellers = products.filter((product) => product.inStock).slice(0, 4);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium text-primary">
        Best Selling products
      </p>

      {isProductsLoading ? (
        <Loader />
      ) : bestSellers.length > 0 ? (
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-6 gap-x-4 mt-6 ">
          {bestSellers.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-gray-500">No best sellers available.</p>
      )}
    </div>
  );
};

export default BestSeller;
