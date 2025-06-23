import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery(""); // Clear the search input after submission
  };

  return (
    <div className="relative bg-[#1e293b] dark:bg-gray-900 py-24 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          Unlock Your Potential
        </h1>
        <p className="text-gray-300 dark:text-gray-400 text-lg mb-8">
          Master in-demand skills with expert-led learning.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex max-w-xl mx-auto overflow-hidden rounded-full bg-[#334155] dark:bg-gray-800 shadow-lg mb-6"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a course..."
            className="flex-grow px-6 py-3 text-white dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none"
          />
          <Button
            type="submit"
            className="h-full px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium transition-colors rounded-none"
          >
            Search
          </Button>
        </form>
        <Button onClick={()=>navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-blue-800 font-bold rounded-full hover:bg-gray-300">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
