import { useState } from "react";
import { Search } from "lucide-react";
import { searchCustomers } from "../../services/customerService";

function CustomerSearch({ setCustomers }) {

  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {

    if (!keyword.trim()) {
      alert("Enter Invoice Number, Phone Number or Customer Name.");
      return;
    }

    try {

      const response = await searchCustomers(keyword);

      setCustomers(response.data);

    } catch (error) {

      console.error(error);

      alert("No customer records found.");

      setCustomers([]);

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Search Customer
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Search using Invoice Number, Phone Number or Customer Name.
          </p>

        </div>

      </div>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Invoice No / Phone Number / Customer Name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl flex items-center gap-2 transition"
        >

          <Search size={18} />

          Search

        </button>

      </div>

    </div>

  );

}

export default CustomerSearch;