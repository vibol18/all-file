import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

export default function Mainlayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar isExpanded={isExpanded} />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
