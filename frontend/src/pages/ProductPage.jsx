import { useState } from "react";
import { Package } from "lucide-react";

import ProductForm from "../components/product/ProductForm";
import ProductTable from "../components/product/ProductTable";

import MainLayout from "../components/layout/MainLayout";

function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const clearSelection = () => {
    setSelectedProduct(null);
  };

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Package size={32} className="text-blue-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                Product Management
              </h1>

              <p className="text-slate-500 text-sm mt-1">
                Add, edit and manage all products in your inventory.
              </p>

            </div>

          </div>

        </div>

        <ProductForm
          selectedProduct={selectedProduct}
          clearSelection={clearSelection}
        />

        <ProductTable
          setSelectedProduct={setSelectedProduct}
        />

      </div>

    </MainLayout>
 );
}

export default ProductPage;