import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  UserCircle,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import authService from "../../services/authService";

function TopBar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    setShowMenu(false);

    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
    }

    toast.success("Logged out successfully");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b shadow-sm z-30 flex items-center justify-between px-6">

      {/* LEFT */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          FLEX MOBILE ERP
        </h2>

        <p className="text-sm text-slate-500">
          Inventory & Sales Management System
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* SEARCH */}
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

        {/* NOTIFICATION */}
        <button
          type="button"
          className="relative rounded-xl bg-slate-100 p-3 hover:bg-slate-200 transition"
        >
          <Bell
            size={20}
            className="text-slate-600"
          />

          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
        </button>

        {/* ADMIN PROFILE */}
        <div className="relative">

          <button
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-100 transition"
          >

            <UserCircle
              size={40}
              className="text-blue-600"
            />

            <div className="text-left">

              <h4 className="font-semibold text-slate-800">
                {user?.fullName || "Admin"}
              </h4>

              <p className="text-xs text-slate-500">
                {user?.role || "System Administrator"}
              </p>

            </div>

            <ChevronDown
              size={18}
              className={`text-slate-500 transition-transform ${
                showMenu ? "rotate-180" : ""
              }`}
            />

          </button>

          {/* DROPDOWN */}
          {showMenu && (
            <div className="absolute right-0 top-14 w-64 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">

              {/* ADMIN INFO */}
              <div className="px-4 py-4 border-b border-slate-200">

                <p className="font-semibold text-slate-800">
                  {user?.fullName || "Admin"}
                </p>

                <p className="text-sm text-slate-500">
                  {user?.username
                    ? `@${user.username}`
                    : "@admin"}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {user?.email || "System Administrator"}
                </p>

              </div>

              {/* PROFILE */}
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/admin/profile");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 text-slate-700"
              >

                <User size={18} />

                <span>
                  Admin Profile
                </span>

              </button>

              {/* LOGOUT */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600"
              >

                <LogOut size={18} />

                <span>
                  Logout
                </span>

              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default TopBar;