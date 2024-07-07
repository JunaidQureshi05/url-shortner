import Header from "@/components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />

        {/* Body */}
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with ❤️ by Juned Ahmad
      </div>
    </div>
  );
};

export default AppLayout;
