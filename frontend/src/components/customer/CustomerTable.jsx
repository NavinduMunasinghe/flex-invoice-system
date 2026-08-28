import { useState } from "react";
import {
  Eye,
  Trash2,
  X,
  Lock,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import authService from "../../services/authService";

function CustomerTable({ customers }) {
  const navigate = useNavigate();

  // ================================
  // DELETE MODAL STATES
  // ================================

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [adminUsername, setAdminUsername] = useState("");

  const [adminPassword, setAdminPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [deleting, setDeleting] = useState(false);

  // ================================
  // OPEN DELETE MODAL
  // ================================

  const handleDeleteClick = (customer) => {
    setSelectedInvoice(customer);

    setAdminUsername("");
    setAdminPassword("");
    setShowPassword(false);

    setShowDeleteModal(true);
  };

  // ================================
  // CLOSE DELETE MODAL
  // ================================

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setShowDeleteModal(false);
    setSelectedInvoice(null);

    setAdminUsername("");
    setAdminPassword("");

    setShowPassword(false);
  };

  // ================================
  // DELETE INVOICE
  // ================================

  const handleDeleteInvoice = async () => {
    // Check username
    if (!adminUsername.trim()) {
      toast.error("Admin username is required.");
      return;
    }

    // Check password
    if (!adminPassword) {
      toast.error("Admin password is required.");
      return;
    }

    // Check selected invoice
    if (!selectedInvoice) {
      toast.error("No invoice selected.");
      return;
    }

    try {
      setDeleting(true);

      // =================================================
      // STEP 1 - AUTHENTICATE ADMIN
      // =================================================

      const loginResponse = await authService.login(
        adminUsername.trim(),
        adminPassword
      );

      // Get token from login response
      const token =
        loginResponse?.token ||
        loginResponse?.data?.token;

      if (!token) {
        throw new Error(
          "Admin authentication failed."
        );
      }

      // =================================================
      // STEP 2 - DELETE INVOICE
      // =================================================

      const response = await fetch(
        `http://localhost:8080/api/invoices/${selectedInvoice.invoiceNo}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",

            // Use token received from login
            Authorization: `Bearer ${token}`,
          },

          // Send username + password to backend
          body: JSON.stringify({
            username: adminUsername.trim(),
            password: adminPassword,
          }),
        }
      );

      // =================================================
      // CHECK DELETE RESPONSE
      // =================================================

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to delete invoice."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      toast.success(
        `Invoice ${selectedInvoice.invoiceNo} deleted successfully.`
      );

      // Close modal
      setShowDeleteModal(false);
      setSelectedInvoice(null);

      setAdminUsername("");
      setAdminPassword("");
      setShowPassword(false);

      // Refresh page
      window.location.reload();

    } catch (error) {
      console.error(
        "Delete invoice error:",
        error
      );

      toast.error(
        error?.message ||
          "Invalid admin username or password."
      );

    } finally {
      setDeleting(false);
    }
  };

  // ================================
  // UI
  // ================================

  return (
    <>
      {/* =================================
          CUSTOMER PURCHASE HISTORY
      ================================= */}

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-5">
          Customer Purchase History
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-slate-100">

                <th className="p-3 text-left">
                  Customer Name
                </th>

                <th className="p-3 text-left">
                  Mobile Number
                </th>

                <th className="p-3 text-left">
                  Invoice No
                </th>

                <th className="p-3 text-left">
                  Purchase Date
                </th>

                <th className="p-3 text-left">
                  Purchased Item
                </th>

                <th className="p-3 text-left">
                  Serial Number
                </th>

                <th className="p-3 text-center">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {customers.length === 0 ? (

                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-slate-500"
                  >
                    No Customer Records Found
                  </td>
                </tr>

              ) : (

                customers.map((customer) => (

                  <tr
                    key={customer.invoiceNo}
                    className="border-b hover:bg-slate-50 transition"
                  >

                    <td className="p-3 font-medium">
                      {customer.customerName}
                    </td>

                    <td className="p-3">
                      {customer.phone}
                    </td>

                    <td className="p-3 font-semibold text-blue-600">
                      {customer.invoiceNo}
                    </td>

                    <td className="p-3">
                      {customer.invoiceDate}
                    </td>

                    <td className="p-3">
                      {customer.productName}
                    </td>

                    <td className="p-3">
                      {customer.serialNumber}
                    </td>

                    {/* ACTION */}

                    <td className="p-3">

                      <div className="flex justify-center gap-2">

                        {/* VIEW INVOICE */}

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              "/invoice/print/" +
                                customer.invoiceNo
                            )
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                          <Eye size={16} />

                          View Invoice
                        </button>

                        {/* DELETE INVOICE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteClick(customer)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                          <Trash2 size={16} />

                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =================================
          DELETE AUTHENTICATION MODAL
      ================================= */}

      {showDeleteModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* ================================
                MODAL HEADER
            ================================= */}

            <div className="flex items-center justify-between p-6 border-b border-slate-200">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Delete Invoice
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Admin authentication is required.
                </p>

              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>

            </div>

            {/* ================================
                MODAL BODY
            ================================= */}

            <div className="p-6 space-y-5">

              {/* WARNING */}

              <div className="bg-red-50 border border-red-200 rounded-xl p-4">

                <p className="text-sm text-red-700">

                  You are about to delete invoice{" "}

                  <span className="font-bold">
                    {selectedInvoice?.invoiceNo}
                  </span>

                  .

                </p>

                <p className="text-xs text-red-600 mt-1">
                  This action cannot be undone.
                </p>

              </div>

              {/* USERNAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Admin Username
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) =>
                      setAdminUsername(
                        e.target.value
                      )
                    }
                    placeholder="Enter admin username"
                    disabled={deleting}
                    autoComplete="username"
                    className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Admin Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={adminPassword}
                    onChange={(e) =>
                      setAdminPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter admin password"
                    disabled={deleting}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-300 pl-10 pr-20 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    disabled={deleting}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 font-semibold"
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

            </div>

            {/* ================================
                MODAL FOOTER
            ================================= */}

            <div className="flex justify-end gap-3 p-6 border-t border-slate-200">

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteInvoice}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-50"
              >

                {deleting
                  ? "Deleting..."
                  : "Authenticate & Delete"}

              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default CustomerTable;