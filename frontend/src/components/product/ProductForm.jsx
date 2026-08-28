import { useEffect, useState } from "react";
import {
  saveProduct,
  updateProduct,
} from "../../services/productService";
import { getWarrantyTemplates } from "../../services/warrantyTemplateService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import WarrantyTemplateModal from "../warranty/WarrantyTemplateModal";
function ProductForm({ selectedProduct, clearSelection }) {
  
  const navigate = useNavigate();
  const [showWarrantyModal, setShowWarrantyModal] = useState(false);
  const [templates, setTemplates] = useState([]);

  const [product, setProduct] = useState({
    productCode: "",
    category: "",
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

  const generateProductCode = (category, brand, model) => {

    if (!category || !brand || !model) {
      return "";
    }
  
    const categoryMap = {
      Earbuds: "EAR",
      Headphones: "HDP",
      Neckband: "NKB",
      Charger: "CHA",
      Cable: "CAB",
      "Power Bank": "PB",
      Other: "OTH",
    };
  
    const brandMap = {
      Soundcore: "SOU",
      Anker: "ANK",
      Baseus: "BAS",
      UGREEN: "UG",
      Oraimo: "ORA",
      JOYROOM: "JOY",
      Awei: "AWE",
    };
  
    const categoryCode = categoryMap[category] || "OTH";
    const brandCode = brandMap[brand] || brand.substring(0, 3).toUpperCase();
  
    const modelCode = model
      .replace(/\s+/g, "")
      .replace(/[^A-Za-z0-9]/g, "")
      .toUpperCase();
  
    return `${categoryCode}-${brandCode}-${modelCode}`;
  
  };

  const loadWarrantyTemplates = async () => {
    try {
      const response = await getWarrantyTemplates();
      setTemplates(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    loadWarrantyTemplates();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    const updatedProduct = {
      ...product,
      [name]: type === "checkbox" ? checked : value,
    };
  
    updatedProduct.productCode = generateProductCode(
      updatedProduct.category,
      updatedProduct.brand,
      updatedProduct.model
    );
  
    setProduct(updatedProduct);
  };

  const clearForm = () => {

    setProduct({
      productCode: "",
      category: "",
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
  
    const productData = {
      ...product,
      warrantyTemplateId:
        product.warrantyTemplateId === ""
          ? null
          : Number(product.warrantyTemplateId),
    };
  
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData);
        alert("Product Updated Successfully");
        clearSelection();
      } else {
        await saveProduct(productData);
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

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Category
        </label>

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          required
        >
          <option value="">Select Category</option>

          <option value="Earbuds">Earbuds</option>
          <option value="Headphones">Headphones</option>
          <option value="Neckband">Neckband</option>
          <option value="Bluetooth Speaker">Bluetooth Speaker</option>
          <option value="Power Bank">Power Bank</option>
          <option value="Charger">Charger</option>
          <option value="Fast Charger">Fast Charger</option>
          <option value="Charging Cable">Charging Cable</option>
          <option value="Phone Case">Phone Case</option>
          <option value="Screen Protector">Screen Protector</option>
          <option value="Smart Watch">Smart Watch</option>
          <option value="Other">Other</option>
        </select>
      </div>

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

      {/* Product Name */}
      <div>
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

      {/* Brand */}
    

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

     

{/* Product Code */}
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Product Code
  </label>

  <div className="flex gap-2">

    <input
      type="text"
      name="productCode"
      value={product.productCode}
      readOnly
      placeholder="Click Generate"
      className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 text-sm bg-slate-100 text-slate-700"
    />

<button
  type="button"
  disabled={!product.category || !product.brand || !product.model}
  onClick={() => {

    const code = generateProductCode(
      product.category,
      product.brand,
      product.model
    );
  
    if (!code) return;
  
    setProduct({
      ...product,
      productCode: code,
    });
  
    toast.success("Product Code Generated Successfully!");
  
  }}
  className={`px-4 rounded-xl text-white ${
    !product.category || !product.brand || !product.model
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  Generate
</button>

  </div>
</div>

{/* Warranty Template */}

<div className="col-span-2">

  <div className="flex justify-between items-center mb-2">

    <label className="text-sm font-semibold text-slate-700">
      Warranty Template
    </label>

    <button
      type="button"
      onClick={() => setShowWarrantyModal(true)}
      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
    >
      + Add New Warranty Template
    </button>
  </div>

  <select
  name="warrantyTemplateId"
  value={product.warrantyTemplateId}
  onChange={handleChange}
  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
>
  <option value="">No Warranty</option>

  {templates.map((template) => (
    <option key={template.id} value={template.id}>
      {template.templateName}
    </option>
  ))}
</select>

</div>
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
<WarrantyTemplateModal
  open={showWarrantyModal}
  onClose={() => setShowWarrantyModal(false)}
  category={product.category}
  brand={product.brand}
  onSaved={(newTemplate) => {
    loadWarrantyTemplates();

    setProduct((prev) => ({
      ...prev,
      warrantyTemplateId: newTemplate.id,
    }));
  }}
/>
</div>

);

}

export default ProductForm;