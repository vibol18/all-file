import { useState } from "react";

const Navbar = () => {
  const [dark, setDark] = useState(false);

  return (
    <nav
      className={`h-16 w-full justify-between flex items-center px-6 border-b
      ${dark ? "bg-black text-white" : "bg-blue-500 text-white"}`}
    >
      <h1 className="font-semibold text-lg">
        Dashboard Overview
      </h1>
      <div className="ml-auto flex items-center gap-4">
        <p className="font-bold">Chhorn vibol (Adimin)</p>
        <div className="w-8 h-8 rounded-full bg-white/30"></div>

        <button
          onClick={() => setDark(!dark)}
          className="text-xl"
        >
          {dark ? "🌙" : "☀️"}
        </button>
      </div>
      <button className="border bg-red-500 rounded-sm py-1 p-4 shadow-sm">Add Admin</button>
    </nav>
  );
};

export default Navbar;
