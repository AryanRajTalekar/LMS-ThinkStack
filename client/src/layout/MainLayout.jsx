import Navbar from '@/utils/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-1 mt-16 px-4 sm:px-1 md:px-2">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
