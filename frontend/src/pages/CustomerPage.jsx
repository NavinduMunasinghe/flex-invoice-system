import { useEffect, useState } from "react";
import { Users } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import CustomerSearch from "../components/customer/CustomerSearch";
import CustomerTable from "../components/customer/CustomerTable";
import { searchCustomers } from "../services/customerService";

function CustomerPage() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await searchCustomers("");
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to load customers:", error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Users
                size={32}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Customer Purchase History
              </h1>

              <p className="text-slate-500 text-sm mt-1">
                Search using Invoice Number, Mobile Number or Customer Name.
              </p>
            </div>

          </div>

        </div>

        <CustomerSearch
          setCustomers={setCustomers}
        />

        <CustomerTable
          customers={customers}
        />

      </div>
    </MainLayout>
  );
}

export default CustomerPage;