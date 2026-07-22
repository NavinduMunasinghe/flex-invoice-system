import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomerTable({ customers }) {

  const navigate = useNavigate();

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-5">
        Customer Purchase History
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-100">

              <th className="p-3 text-left">Customer Name</th>

              <th className="p-3 text-left">Mobile Number</th>

              <th className="p-3 text-left">Invoice No</th>

              <th className="p-3 text-left">Purchase Date</th>

              <th className="p-3 text-left">Purchased Item</th>

              <th className="p-3 text-left">Serial Number</th>

              <th className="p-3 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {customers.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-10 text-slate-500"
                >
                  No Customer Records Found
                </td>

              </tr>

            ) : (

              customers.map((customer) => (

                <tr
                  key={customer.invoiceNo}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-3 font-medium">
                    {customer.customerName}
                  </td>

                  <td className="p-3">
                    {customer.phone}
                  </td>

                  <td className="p-3 font-semibold text-blue-600">
                    {customer.invoiceNo}
                  </td>

                  <td className="p-3">
                    {customer.invoiceDate}
                  </td>

                  <td className="p-3">
                    {customer.productName}
                  </td>

                  <td className="p-3">
                    {customer.serialNumber}
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center">

                      <button
                        onClick={() =>
                          navigate("/invoice/print/" + customer.invoiceNo)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Eye size={16} />
                        View Invoice
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default CustomerTable;