import React from "react";

const NotFoundPage = () => {
    return (
        <div className="px-4 py-16">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
                <p className="text-2xl md:text-3xl text-muted mt-4 font-semibold">
                    Oops! Page not found
                </p>
                <p className="text-secondary mt-2 mb-6">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
