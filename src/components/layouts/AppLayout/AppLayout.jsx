import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main>
        {/* Header */}

        {/* Body */}
        <Outlet />
      </main>
      {/* Footer */}
    </div>
  );
};

export default AppLayout;
