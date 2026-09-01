import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Search } from "lucide-react";

const Products = () => {
  const { products, isProductsLoading, searchQuery, setSearchQuery } =
    useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col ">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase text-primary">
          All Products
        </p>
        <div className="w-16 h-0.5 bg-accent rounded-full"></div>
      </div>

      {/* Search bar (visible on small screens) */}
      <div className="flex mt-5 mx-auto flex-1 items-center text-sm gap-2 border border-border-color px-3 rounded-full min-w-[200px] sm:min-w-[300px] max-w-[90%] lg:hidden">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-1.5 w-full bg-transparent outline-none placeholder-text-muted text-sm text-primary"
          type="text"
          placeholder="Search products"
        />

        <Search className="size-4" />
      </div>

      {/* Loading / No Products / Product Grid */}
      <div className="mt-6">
        {isProductsLoading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-6 gap-x-4">
            {/* Showing only the products that are in stock */}
            {filteredProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
