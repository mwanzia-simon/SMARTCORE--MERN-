import React from "react";
import { Link } from "react-router-dom";
import { hero_svg_1 } from "../assets/assets";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative rounded-md md:flex justify-evenly bg-main md:bg-card  mt-10 md:p-10">
      <div className=" flex flex-col items-left justify-center mb-3  md:w-auto  p-4 text-primary">
        <h1 className="text-center text-3xl md:text-4xl lg:text-4xl font-bold  leading-tight lg:leading-15 mx-auto md:mx-0 max-w-[100%]  md:text-left">
          Power Meets Performance
        </h1>
        <p className=" mt-3 text-center md:text-left">
          Discover high-performance laptops engineered for creators, developers,
          students, and professionals. Whether you're coding, designing, editing
          videos, or tackling demanding workloads, find reliable machines that
          deliver exceptional speed, power, and all-day productivity.
        </p>
        <div className="flex items-center mt-6 font-medium">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-5 md:px-8 py-3 bg-accent/90 hover:bg-accent-hover transition rounded-full text-white cursor-pointer mx-auto md:mx-0"
          >
            Shop Now <ArrowRight className="group-hover:translate-x-1 transition"/>
          </Link>
        </div>
      </div>
      <img src={hero_svg_1} alt="banner" className="w-2/3 md:w-2/6 mx-auto" />
    </div>
  );
};

export default Hero;
