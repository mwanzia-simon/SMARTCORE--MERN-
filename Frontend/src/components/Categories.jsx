import React from "react";
import { categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium text-primary">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`)
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-110 transition max-w-28"
            />
            <p className="text-sm font-medium text-secondary">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
