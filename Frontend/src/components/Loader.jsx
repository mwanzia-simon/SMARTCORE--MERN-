import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-3 text-xl text-primary">Loading...</span>
        </div>
    );
};

export default Loader;
