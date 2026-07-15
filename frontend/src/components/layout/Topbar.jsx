function Topbar() {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold">
          Flex Mobile ERP
        </h2>
        <p className="text-sm text-gray-500">
          Warranty Template Management
        </p>
      </div>

      <div className="text-sm text-gray-600">
        Admin
      </div>
    </header>
  );
}

export default Topbar;