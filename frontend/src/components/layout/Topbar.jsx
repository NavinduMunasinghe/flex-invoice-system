import { Bell, Search, UserCircle } from "lucide-react";

function TopBar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b shadow-sm z-30 flex items-center justify-between px-6">

      {/* Left */}

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          FLEX MOBILE ERP
        </h2>

        <p className="text-sm text-slate-500">
          Inventory & Sales Management System
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Notification */}

        <button className="relative rounded-xl bg-slate-100 p-3 hover:bg-slate-200 transition">

          <Bell
            size={20}
            className="text-slate-600"
          />

          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-blue-600"
          />

          <div>

            <h4 className="font-semibold text-slate-800">
              Admin
            </h4>

            <p className="text-xs text-slate-500">
              System Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default TopBar;