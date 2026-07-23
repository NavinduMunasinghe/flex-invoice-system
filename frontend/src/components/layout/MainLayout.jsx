import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function MainLayout({ children }) {
  return (
    <div className="flex">

    <Sidebar />

      <div className="flex-1 ml-64">

          <TopBar />

          <main className="mt-16 min-h-screen bg-slate-100 px-6 pb-6 pt-6">

              {children}

          </main>

      </div>

  </div>
  );
}

export default MainLayout;