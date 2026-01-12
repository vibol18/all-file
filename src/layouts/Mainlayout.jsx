import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const MainLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <div className="flex-1 flex flex-col">
        <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

        <main className="p-6">
          <Outlet /> {/* Pages like Dashboard, Product, Analytics will render here */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
