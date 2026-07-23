import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Receipt,
  ShieldCheck,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const menus = [
    {
      icon: <LayoutDashboard size={20} />,
      name: "Dashboard",
      path: "/",
    },

    {
      icon: <Receipt size={20} />,
      name: "Invoices",
      path: "/invoice",
    },

    {
      icon: <Users size={20} />,
      name: "Customers",
      path: "/customers",
    },

    {
      icon: <Package size={20} />,
      name: "Products",
      path: "/products",
    },

    {
      icon: <ShieldCheck size={20} />,
      name: "Warranty",
      path: "/warranty",
    },
    
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col">

      {/* Logo */}

      <div className="px-8 py-7 border-b border-slate-800">

        <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">
          FLEX MOBILE
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          ERP Management System
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {menus.map((menu) => (

          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {menu.icon}

            <span>{menu.name}</span>

          </NavLink>

        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 py-3 transition">

          <LogOut size={18} />

          Logout

        </button>

        <p className="text-center text-xs text-slate-500 mt-5">
          © 2026 FLEX MOBILE ERP
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;