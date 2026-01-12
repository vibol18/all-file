import { useEffect, useState } from "react";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/me")
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error(err));
  }, []);

  return (
    <nav
      className={`h-16 w-full flex items-center px-6 border-b
      ${dark ? "bg-black text-white" : "bg-blue-500 text-white"}`}
    >
      <h1 className="font-semibold text-lg">
        Dashboard Overview
      </h1>

      <div className="ml-auto flex items-center gap-4">
        <p className="font-bold">
          {user ? `${user.name} (${user.role})` : "Loading..."}
        </p>

        <div className="w-8 h-8 rounded-full bg-white/30"></div>

        <button
          onClick={() => setDark(!dark)}
          className="text-xl"
        >
          {dark ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
