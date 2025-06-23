
import React from "react";
import { Loader } from "lucide-react"; // from lucide-react

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingSpinner;
