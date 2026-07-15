import { BrowserRouter, Routes, Route } from "react-router-dom";

import InvoicePage from "./pages/InvoicePage";
import PrintInvoice from "./pages/PrintInvoice";
import WarrantyTemplatePage from "./pages/WarrantyTemplatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WarrantyTemplatePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route
          path="/invoice/print/:invoiceNo"
          element={<PrintInvoice />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;