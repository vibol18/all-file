const Navbar = ({ isExpanded }) => {
  return (
    <nav className={`h-16 border-b bg-white flex items-center px-6 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
      <h1 className="font-semibold text-gray-700">Dashboard Overivew</h1>
      <div className="ml-auto flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </nav>
  );
};

export default Navbar;