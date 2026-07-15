import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

function ProductSection({ items, setItems }) {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };
  
  useEffect(() => {
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
      }
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

  const total = items.reduce(
    (sum, item) => sum + Number(item.qty) * Number(item.price),
    0
  );

  return (
    <div className="border rounded-2xl p-6 mt-6 bg-white">

      <h2 className="text-2xl font-bold mb-5">
        Product Details
      </h2>

      <table className="w-full border border-gray-300">

      <thead className="bg-gray-100">
        <tr>
          <th>Code</th>
          <th>Product Name</th>
          <th>Serial Number</th>
          <th>Warranty</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Amount</th>
          <th className="print:hidden">Action</th>
        </tr>
      </thead>

        <tbody>

          {items.map((item, index) => (

            <tr key={index}>

              {/* Product Code */}

              <td className="border px-2 py-1 text-[8.5px] text-center">
                  {item.code || "-"}
              </td>

              {/* Product */}

              <td className="border px-2 py-1">

                  <select
                      className="w-full border rounded px-2 py-1 text-[8.5px]"
                      value={item.productId}
                      onChange={(e) =>
                          handleProductChange(index, e.target.value)
                      }
                  >
                      <option value="">Select Product</option>

                      {products.map((product) => (
                          <option key={product.id} value={product.id}>
                              {product.productName}
                          </option>
                      ))}

                  </select>

              </td>
              <td className="border p-2">

                <input
                  className="w-full border rounded px-2 py-1 text-[8.5px]"
                  value={item.serial}
                  onChange={(e) =>
                    handleChange(index, "serial", e.target.value)
                  }
                />

              </td>

              <td className="border px-2 py-1 text-[8.5px] text-center">
                {item.warranty ? `${item.warranty} Months` : "-"}
            </td>

              <td className="border p-2">

                <input
                  type="number"
                  min="1"
                  className="w-20 p-2 border rounded"
                  value={item.qty}
                  onChange={(e) =>
                    handleChange(index, "qty", e.target.value)
                  }
                />

              </td>

              <td className="border p-2">

                <input
                  type="number"
                  className="w-full border rounded px-2 py-1 text-[8.5px] text-right"
                  value={item.price}
                  onChange={(e) =>
                    handleChange(index, "price", e.target.value)
                  }
                />

              </td>

              <td className="border px-2 py-1 text-[8.5px] text-right font-semibold">

                Rs. {(item.qty * item.price).toFixed(2)}

              </td>

              <td className="border p-2 text-center">

                <button
                  onClick={() => removeRow(index)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-[8px] print:hidden"
                >
                  Remove
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex justify-between items-center mt-5">

        <button
          onClick={addRow}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm print:hidden"
        >
          + Add Product
        </button>

        <h2 className="text-lg font-bold text-right">
          Total : Rs. {total.toFixed(2)}
        </h2>

      </div>

    </div>
  );
}

export default ProductSection;