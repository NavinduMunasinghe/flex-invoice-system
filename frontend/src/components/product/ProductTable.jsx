import { useEffect, useMemo, useState } from "react";
import { getProducts, deleteProduct } from "../../services/productService";
import { Search, Pencil, Trash2, Package } from "lucide-react";

function ProductTable({ setSelectedProduct }) {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await deleteProduct(id);

      loadProducts();

    } catch (error) {
 
  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const keyword = search.toLowerCase();

      return (
        product.productCode?.toLowerCase().includes(keyword) ||
        product.productName?.toLowerCase().includes(keyword) ||
        product.brand?.toLowerCase().includes(keyword)
      );

    });

  }, [products, search]);

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-3">

          <div className="bg-blue-100 p-3 rounded-xl">
            <Package className="text-blue-600" size={24} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Product List
            </h2>

            <p className="text-sm text-slate-500">
              Total Products : {filteredProducts.length}
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="relative w-80">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-100 text-slate-700">

              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-right">Buying</th>
              <th className="p-3 text-right">Selling</th>
              <th className="p-3 text-center">Warranty</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
                key={product.id}
                className="border-b hover:bg-slate-50 transition"
              >

                <td className="p-3 font-medium">
                  {product.productCode}
                </td>

                <td className="p-3">
                  {product.productName}
                </td>

                <td className="p-3">
                  {product.brand}
                </td>

                <td className="p-3 text-right">
                  Rs. {Number(product.buyingPrice).toLocaleString()}
                </td>

                <td className="p-3 text-right font-semibold text-blue-700">
                  Rs. {Number(product.sellingPrice).toLocaleString()}
                </td>

                <td className="p-3 text-center">
                  {product.warrantyMonths} M
                </td>

                <td className="p-3 text-center">

                  {product.status ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Inactive
                    </span>

                  )}

                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ProductTable;