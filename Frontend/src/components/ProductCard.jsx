import React from "react";
import { useAppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();
  const Star = ({ filled }) => (
    <svg
      className="w-4 h-4 text-yellow-400"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z"
      />
    </svg>
  );

  return (
    product && (
      <div
        onClick={() => {
          navigate(`products/${product.category.toLowerCase()}/${product._id}`);
        }}
        className="border border-gray-500/20 rounded-md px-3 py-2 bg-card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-full h-[132px]"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p className="text-muted">{product.category}</p>
          <p className="text-secondary font-medium  truncate w-full mt-2">
            {product.name}
          </p>
          <div className="flex items-center gap-2 mt-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <p key={i} className="md:w-3 w-3">
                  {i < 4 ? <Star filled={true} /> : <Star filled={false} />}
                </p>
              ))}
            <p className="text-primary">({4})</p>
          </div>
          <div className="flex items-end justify-between mt-3 ">
            <p className="md:text-xl text-base font-medium text-primary">
              {currency} {product.offerPrice.toLocaleString()}{" "}
              <span className="text-muted md:text-sm text-xs line-through">
                {currency}
                {product.price.toLocaleString()}
              </span>
            </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-primary"
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-accent/50 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer hover:bg-accent/80 transition-all"
                  onClick={() => addToCart(product._id)}
                >
                  <ShoppingCart className="size-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={() => {
                      removeFromCart(product._id);
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
