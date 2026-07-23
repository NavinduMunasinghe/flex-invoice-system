import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductPage from "./pages/ProductPage";
import InvoicePage from "./pages/InvoicePage";
import PrintInvoice from "./pages/PrintInvoice";
import WarrantyTemplatePage from "./pages/WarrantyTemplatePage";
//import DashboardPage from "./pages/DashboardPage";
import CustomerPage from "./pages/CustomerPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<ProductPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/warranty" element={<WarrantyTemplatePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/invoice/print/:invoiceNo" element={<PrintInvoice />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;