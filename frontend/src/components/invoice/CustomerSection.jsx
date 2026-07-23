import { Search, User } from "lucide-react";
import { searchCustomers } from "../../services/customerService";
function CustomerSection({
  customer,
  setCustomer,
  paymentMethod,
  setPaymentMethod,
}) {

  const handleSearch = async () => {

    if (!customer.phone) {
      alert("Enter phone number");
      return;
    }
  
    try {
  
      const response = await searchCustomers(customer.phone);
  
      if (response.data.length > 0) {
  
        const c = response.data[0];
  
        setCustomer({
          id: c.customerId,
          phone: c.phone,
          name: c.customerName,
          address: "",
        });
  
      } else {
        alert("Customer not found");
      }
  
    } catch (error) {
  
      console.error(error);
      alert("Customer not found");
  
    }
  
  };

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">

      {/* Header */}

      <div className="flex items-center gap-3 border-b border-slate-200 pb-5 mb-6">

        <div className="bg-blue-100 p-3 rounded-xl">

          <User
            size={24}
            className="text-blue-600"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Customer Information
          </h2>

          <p className="text-sm text-slate-500">
            Search existing customer or enter new customer details.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-5">

        {/* Phone */}

        <div>

          <label className="block text-sm font-semibold mb-2">
            Phone Number
          </label>

          <div className="flex gap-3">

            <input
              type="text"
              value={customer.phone}
              placeholder="07XXXXXXXX"
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  phone: e.target.value,
                })
              }
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl flex items-center gap-2 transition"
            >
              <Search size={18} />
              Search
            </button>

          </div>

        </div>

        {/* Customer Name */}

        <div>

          <label className="block text-sm font-semibold mb-2">
            Customer Name
          </label>

          <input
            type="text"
            value={customer.name}
            placeholder="Customer Name"
            onChange={(e) =>
              setCustomer({
                ...customer,
                name: e.target.value,
              })
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>
      {/* Address */}

      <div className="col-span-2">          

    <label className="block text-sm font-semibold mb-2">
      Address
    </label>

      <textarea
        rows={3}
        value={customer.address}
        placeholder="Customer Address"
        onChange={(e) =>
          setCustomer({
            ...customer,
            address: e.target.value,
          })
        }
        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
      />

    </div>

    {/* Payment Method */}

    <div>

      <label className="block text-sm font-semibold mb-2">
        Payment Method
      </label>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option>Cash</option>
        <option>Card</option>
        <option>Bank Transfer</option>
        <option>KOKO Pay</option>
      </select>

    </div>

    {/* Customer Status */}

    <div>

      <label className="block text-sm font-semibold mb-2">
        Customer Status
      </label>

      <input
        type="text"
        value={customer.id ? "Existing Customer" : "New Customer"}
        readOnly
        className={`w-full rounded-xl px-4 py-3 text-sm font-medium ${
          customer.id
            ? "bg-green-50 text-green-700 border border-green-300"
            : "bg-yellow-50 text-yellow-700 border border-yellow-300"
        }`}
      />

    </div>

  </div>

</div>

);

}

export default CustomerSection;