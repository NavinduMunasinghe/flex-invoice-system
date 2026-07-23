import { useEffect, useState } from "react";
import { Plus, Trash2, Package } from "lucide-react";
import { getProducts } from "../../services/productService";

function ProductSection({
  items,
  setItems,
  total,
  handleSave,
}) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    loadProducts();
  }, []);

  const addRow = () => {

    setItems([
      ...items,
      {
        productId: "",
        code: "",
        product: "",
        serial: "",
        warranty: "",
        qty: 1,
        price: 0,
      },
    ]);

  };

  const removeRow = (index) => {

    if (items.length === 1) return;

    setItems(items.filter((_, i) => i !== index));

  };

  const handleProductChange = (index, productId) => {

    const selected = products.find(
      (p) => String(p.id) === String(productId)
    );

    const updated = [...items];

    updated[index].productId = selected?.id || "";
    updated[index].product = selected?.productName || "";
    updated[index].price = Number(selected?.sellingPrice || 0);
    updated[index].code = selected?.productCode || "";
    updated[index].warranty = selected?.warrantyMonths || 0;

    setItems(updated);

  };

  const handleChange = (index, field, value) => {

    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-6">

      {/* Header */}

      <div className="border-b border-slate-200 pb-5 mb-6 flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">

            <Package size={28} />

            Product Details

          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Select products for this invoice.
          </p>

        </div>

        <button
          onClick={addRow}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-100">

              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Serial Number</th>
              <th className="p-3 text-center">Warranty</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-right">Unit Price</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => (

              <tr
                key={index}
                className="border-b hover:bg-slate-50 transition"
              >

                <td className="p-3 font-medium">
                  {item.code || "-"}
                </td>

                <td className="p-3">

                  <select
                    value={item.productId}
                    onChange={(e) =>
                      handleProductChange(index, e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >

                    <option value="">
                      Select Product
                    </option>

                    {products.map((product) => (

                      <option
                        key={product.id}
                        value={product.id}
                      >
                        {product.productCode} - {product.productName}
                      </option>

                    ))}

                  </select>

                </td>

                <td className="p-3">

                  <input
                    type="text"
                    value={item.serial}
                    onChange={(e) =>
                      handleChange(index, "serial", e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                </td>

                <td className="p-3 text-center">
                  {item.warranty
                    ? `${item.warranty} Months`
                    : "-"}
                </td>

                <td className="p-3">

                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      handleChange(index, "qty", e.target.value)
                    }
                    className="w-20 mx-auto border border-slate-300 rounded-xl px-2 py-2 text-center focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                </td>

                <td className="p-3">

                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-right focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                </td>

                <td className="p-3 text-right font-bold text-blue-700">
                  Rs. {(item.qty * item.price).toLocaleString()}
                </td>

                <td className="p-3 text-center">

                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl transition"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>

              </tr>

            ))}

</tbody>

</table>

</div>

{/* Footer */}

<div className="border-t border-slate-200 mt-6 pt-6">

<div className="flex justify-between items-center">

  <div>

    <p className="text-sm text-slate-500 font-medium">
      Grand Total
    </p>

    <h2 className="text-3xl font-bold text-blue-600 mt-1">
      Rs. {Number(total).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </h2>

  </div>

  <button
    type="button"
    onClick={handleSave}
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
  >
    Save Invoice
  </button>

</div>

</div>

</div>

);

}

export default ProductSection;