import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductPage from "./pages/ProductPage";
import InvoicePage from "./pages/InvoicePage";
import PrintInvoice from "./pages/PrintInvoice";
import WarrantyTemplatePage from "./pages/WarrantyTemplatePage";
import CustomerPage from "./pages/CustomerPage";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminProfilePage from "./pages/AdminProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />

        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />

        {/* Warranty */}
        <Route
          path="/warranty"
          element={
            <ProtectedRoute>
              <WarrantyTemplatePage />
            </ProtectedRoute>
          }
        />

        {/* Invoice */}
        <Route
          path="/invoice"
          element={
            <ProtectedRoute>
              <InvoicePage />
            </ProtectedRoute>
          }
        />

        {/* Customers */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomerPage />
            </ProtectedRoute>
          }
        />

        {/* Print Invoice */}
        <Route
          path="/invoice/print/:invoiceNo"
          element={
            <ProtectedRoute>
              <PrintInvoice />
            </ProtectedRoute>
          }
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"  
          element={ 
          <LoginPage /> 
          } 
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </BrowserRouter>
  );
}

export default App;