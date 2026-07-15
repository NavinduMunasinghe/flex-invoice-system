import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}

      <Sidebar />

      {/* Right Side */}

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 p-6 overflow-auto">

          {children}

        </main>

      </div>

    </div>
  );
}

export default MainLayout;