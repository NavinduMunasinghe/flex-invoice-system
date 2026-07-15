function Sidebar() {
  const menus = [
    "Dashboard",
    "Products",
    "Customers",
    "Suppliers",
    "Purchases",
    "Invoices",
    "Warranty",
    "Reports",
    "Settings",
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">FLEX MOBILE</h1>
        <p className="text-xs text-slate-400">ERP System v1.0</p>
      </div>

      <nav className="flex-1 py-4">
        {menus.map((menu) => (
          <div
            key={menu}
            className={`px-6 py-3 cursor-pointer ${
              menu === "Warranty"
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {menu}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;