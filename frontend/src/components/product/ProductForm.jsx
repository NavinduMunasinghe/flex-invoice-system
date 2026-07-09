import { useState } from "react";
import { saveProduct } from "../../services/productService";

function ProductForm() {
  const [product, setProduct] = useState({
    productCode: "",
    barcode: "",
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveProduct(product);

      alert("Product saved successfully!");

      setProduct({
        productCode: "",
        barcode: "",
        brand: "",
        model: "",
        productName: "",
        sellingPrice: "",
        warrantyMonths: "",
        warrantyTemplateId: "",
        status: true,

      });

    } catch (error) {
      console.error(error);
      alert("Failed to save product.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <input
         type="number"
         name="buyingPrice"
         placeholder="Buying Price"
         value={product.buyingPrice}
         onChange={handleChange}
         className="border rounded-lg p-3"
         required
        />

        <input
          type="text"
          name="productCode"
          placeholder="Product Code"
          value={product.productCode}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="barcode"
          placeholder="Barcode"
          value={product.barcode}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={product.model}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={product.productName}
          onChange={handleChange}
          className="border rounded-lg p-3 col-span-2"
          required
        />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={product.sellingPrice}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="warrantyMonths"
          placeholder="Warranty Months"
          value={product.warrantyMonths}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="warrantyTemplateId"
          placeholder="Warranty Template ID"
          value={product.warrantyTemplateId}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <label className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            name="status"
            checked={product.status}
            onChange={handleChange}
          />
          Active Product
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-3 col-span-2 hover:bg-blue-700"
        >
          Save Product
        </button>

      </form>
    </div>
  );
}

export default ProductForm;