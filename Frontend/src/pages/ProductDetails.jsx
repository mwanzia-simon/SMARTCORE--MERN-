import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CreditCard, ShoppingCart } from "lucide-react";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const product = products.find((item) => item._id === id);

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

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category,
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  return (
    product && (
      <div className="mt-12">
        <p className="text-primary">
          <Link to={`/`}>Home</Link> /<Link to={`/products`}> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>{" "}
          /<Link className="text-secondary"> {product.name}</Link>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3 ">
            <div className="flex flex-col gap-3">
              {product.image.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(img)}
                  className="border max-w-24 border-border-color rounded overflow-hidden cursor-pointer"
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="  rounded overflow-hidden p-2">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-[400px]  mx-auto "
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium text-primary">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <p key={i} className="md:w-3 w-3">
                    {i < 4 ? <Star filled={true} /> :<Star filled={false} />  }
                  </p>
                ))}
              <p className="text-base ml-2 text-secondary">(4)</p>
            </div>

            <div className="mt-6">
              <p className="text-muted line-through">
                {currency}{" "}
                {product.price.toLocaleString()}
              </p>
              <p className="text-2xl font-medium text-primary">
               {currency}{" "}
                {product.offerPrice.toLocaleString()}
              </p>
            </div>

            <p className="text-base font-medium mt-6 text-primary">
              About Product
            </p>
            <ul className="list-disc ml-4 text-secondary">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 cursor-pointer font-medium bg-card text-primary hover:bg-hover transition flex items-center justify-center gap-2 rounded"
              >
                <ShoppingCart size={20}/>
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-accent text-primary hover:bg-accent-hover transition flex items-center justify-center gap-2 rounded"
              >
                <CreditCard size={20}/>
                Buy now
              </button>
            </div>
          </div>
        </div>
        {/* --------Realted Products--------- */}
        <div className="flex flex-col items-center mt-20 ">
          <div className="flex flex-col items-center w-max">
            <p className="text-3xl font-medium text-primary">
              Related Products
            </p>
            <div className="w-20 h-0.5 bg-accent rounded-full"></div>
          </div>
          <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-6 gap-x-4 mt-6">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate(`/products`);
            }}
            className="mx-auto cursor-pointer px-12 my-16 py-2.5 border border-border-color rounded text-primary hover:bg-primary/10 transition"
          >
            See More
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
