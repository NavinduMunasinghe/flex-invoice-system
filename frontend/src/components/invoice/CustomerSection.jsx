import { searchCustomerByPhone } from "../../services/customerService";

function CustomerSection({ customer, setCustomer }) {

  const handleSearch = async () => {

    if (!customer.phone) {
      alert("Enter phone number");
      return;
    }

    try {

      const response = await searchCustomerByPhone(customer.phone);

      if (response.data) {

        setCustomer({
          id: response.data.id,
          phone: response.data.phone,
          name: response.data.name,
          address: response.data.address,
        });

      }

    } catch (error) {

      console.error(error);
      alert("Customer not found");

    }

  };

  return (

    <div className="bg-white border border-gray-400 rounded-md p-4 mt-4">

      <h2 className="text-lg font-bold mb-3">
        Customer Details
      </h2>

      <div className="grid grid-cols-2 gap-3">

        <div>

          <label className="block mb-2">
            Phone Number
          </label>

          <div className="flex gap-2">

            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  phone: e.target.value,
                })
              }
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm print:hidden"
            >
              Search
            </button>

          </div>

        </div>

        <div>

          <label className="block mb-2">
            Customer Name
          </label>

          <input
            className="w-full border rounded px-2 py-1 text-sm"
            value={customer.name}
            onChange={(e) =>
              setCustomer({
                ...customer,
                name: e.target.value,
              })
            }
          />

        </div>

        <div className="col-span-2">

          <label className="block mb-2">
            Address
          </label>

          <textarea
            rows="2"
            className="w-full border rounded px-2 py-1 text-sm"
            value={customer.address}
            onChange={(e) =>
              setCustomer({
                ...customer,
                address: e.target.value,
              })
            }
          />

        </div>

      </div>

    </div>

  );

}

export default CustomerSection;