import ProductForm from "../components/product/ProductForm";
import ProductTable from "../components/product/ProductTable";

function ProductPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <ProductForm />

        <ProductTable />

      </div>
    </div>
  );
}

export default ProductPage;