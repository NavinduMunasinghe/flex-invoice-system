import { useEffect, useState } from "react";
import {
  saveProduct,
  updateProduct,
} from "../../services/productService";
import { getWarrantyTemplates } from "../../services/warrantyTemplateService";

function ProductForm({ selectedProduct, clearSelection }) {

  const [templates, setTemplates] = useState([]);

  const [product, setProduct] = useState({
    productCode: "",
    brand: "",
    model: "",
    productName: "",
    sellingPrice: "",
    warrantyMonths: "",
    warrantyTemplateId: "",
    status: true,
    buyingPrice: "",
    stockQty: 0,
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getWarrantyTemplates();
        setTemplates(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });

  };

  const clearForm = () => {

    setProduct({
      productCode: "",
      brand: "",
      model: "",
      productName: "",
      sellingPrice: "",
      warrantyMonths: "",
      warrantyTemplateId: "",
      status: true,
      buyingPrice: "",
      stockQty: 0,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (selectedProduct) {

        await updateProduct(selectedProduct.id, product);

        alert("Product Updated Successfully");

        clearSelection();

      } else {

        await saveProduct(product);

        alert("Product Saved Successfully");

      }

      clearForm();

    } catch (error) {

      console.error(error);

      alert("Failed to save product.");

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">

      <div className="flex justify-between items-center border-b border-slate-200 pb-5 mb-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            {selectedProduct ? "Update Product" : "Add New Product"}

          </h2>

          <p className="text-sm text-slate-500 mt-1">

            Add and manage products in your inventory.

          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-5"
      >
        {/* Buying Price */}
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Buying Price
  </label>

  <input
    type="number"
    name="buyingPrice"
    value={product.buyingPrice}
    onChange={handleChange}
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    required
  />
</div>

{/* Product Code */}
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Product Code
  </label>

  <input
    type="text"
    name="productCode"
    value={product.productCode}
    onChange={handleChange}
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    required
  />
</div>

{/* Brand */}
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Brand
  </label>

  <select
    name="brand"
    value={product.brand}
    onChange={handleChange}
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    required
  >
    <option value="">Select Brand</option>
    <option>Soundcore</option>
    <option>Anker</option>
    <option>Baseus</option>
    <option>UGREEN</option>
    <option>Oraimo</option>
    <option>Awei</option>
    <option>JOYROOM</option>
  </select>
</div>

{/* Model */}
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Model
  </label>

  <input
    type="text"
    name="model"
    value={product.model}
    onChange={handleChange}
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>

{/* Product Name */}
<div className="col-span-2">
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Product Name
  </label>

  <input
    type="text"
    name="productName"
    value={product.productName}
    onChange={handleChange}
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    required
  />
</div>

{/* Selling Price */}
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Selling Price
  </label>

  <input
    type="number"
    name="sellingPrice"
    value={product.sellingPrice}
    onChange={handleChange}
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    required
  />
</div>

{/* Warranty Months */}
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Warranty Months
  </label>

  <input
    type="number"
    name="warrantyMonths"
    value={product.warrantyMonths}
    onChange={handleChange}
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    required
  />
</div>

{/* Warranty Template */}
<div className="col-span-2">
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Warranty Template
  </label>

  <select
    name="warrantyTemplateId"
    value={product.warrantyTemplateId}
    onChange={handleChange}
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
  >
    <option value="">Select Warranty Template</option>

    {templates.map((template) => (
      <option key={template.id} value={template.id}>
        {template.templateName}
      </option>
    ))}
  </select>
</div>

{/* Status */}
<div className="col-span-2 flex items-center gap-3">

  <input
    type="checkbox"
    name="status"
    checked={product.status}
    onChange={handleChange}
  />

  <span className="text-sm font-medium">
    Active Product
  </span>

</div>

{/* Buttons */}
<div className="col-span-2 flex gap-3">

  <button
    type="submit"
    className={`flex-1 py-3 rounded-xl text-white font-semibold transition ${
      selectedProduct
        ? "bg-green-600 hover:bg-green-700"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {selectedProduct ? "Update Product" : "Save Product"}
  </button>

  {selectedProduct && (
    <button
      type="button"
      onClick={() => {
        clearForm();
        clearSelection();
      }}
      className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
    >
      Cancel
    </button>
  )}

</div>

</form>

</div>

);

}

export default ProductForm;