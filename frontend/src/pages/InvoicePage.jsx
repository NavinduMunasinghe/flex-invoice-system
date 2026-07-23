import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import CustomerSection from "../components/invoice/CustomerSection";
import ProductSection from "../components/invoice/ProductSection";

import {
  saveInvoice,
  getLatestInvoice,
} from "../services/invoiceService";

import logo from "../assets/flex-logo.png";

function InvoicePage() {

  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [savedInvoice, setSavedInvoice] = useState(null);

  const [customer, setCustomer] = useState({
    id: "",
    phone: "",
    name: "",
    address: "",
  });

  const [items, setItems] = useState([
    {
      productId: "",
      code: "",
      product: "",
      serial: "",
      warranty: "",
      qty: 1,
      price: 0,
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const total = items.reduce(
    (sum, item) => sum + Number(item.qty) * Number(item.price),
    0
  );

  useEffect(() => {
    loadLatestInvoice();
  }, []);

  const loadLatestInvoice = async () => {
    try {
      const response = await getLatestInvoice();

      if (response.data) {
        setSavedInvoice(response.data);
      }
    } catch (error) {
      console.error("Latest Invoice Load Error :", error);
    }
  };

  const handleSave = async () => {

    if (!customer.phone) {
      alert("Enter customer phone number.");
      return;
    }

    if (!customer.name) {
      alert("Enter customer name.");
      return;
    }

    const validItems = items.filter(
      (item) => item.productId
    );

    if (validItems.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    const request = {
      phone: customer.phone,
      name: customer.name,
      address: customer.address,
      paymentMethod,

      items: validItems.map((item) => ({
        productId: item.productId,
        serialNumber: item.serial,
        quantity: Number(item.qty),
        unitPrice: Number(item.price),
      })),
    };

    try {

      await saveInvoice(request);

      await loadLatestInvoice();

      setShowSuccessModal(true);

    } catch (error) {

      console.error(error);

      alert(JSON.stringify(error.response?.data));

    }

  };

  return (
    <MainLayout>
  
      {/* Header */}
      <div className="bg-white rounded-xl shadow border p-6 mb-6">
  
        <div className="flex justify-between items-center">
  
          <div className="flex items-center gap-4">
  
            <img
              src={logo}
              alt="Flex Mobile"
              className="w-20"
            />
  
            <div>
              <h1 className="text-2xl font-bold">
                FLEX MOBILE
              </h1>
  
              <p className="text-gray-500">
                Sales Invoice
              </p>
            </div>
  
          </div>
  
        </div>
  
      </div>
  
      {/* Customer */}
      <CustomerSection
        customer={customer}
        setCustomer={setCustomer}
      />
  
      {/* Products */}
      <ProductSection
        items={items}
        setItems={setItems}
        total={total}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleSave={handleSave}
      />

          {/* Latest Saved Invoice */}
          {savedInvoice && (
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    🧾 Latest Saved Invoice
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Recently saved invoice details
                  </p>
                </div>

                <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  ✓ Saved
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

                <div>
                  <p className="text-sm text-gray-500">Invoice No</p>
                  <p className="text-lg font-bold text-gray-900">
                    {savedInvoice.invoiceNo}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {savedInvoice.customerName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {savedInvoice.date}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="inline-flex px-3 py-1 mt-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                    {savedInvoice.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-blue-600">
                    Rs. {Number(savedInvoice.total).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-8">

                <button
                  onClick={() =>
                    navigate("/invoice/print/" + savedInvoice.invoiceNo)
                  }
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                >
                  👁 View
                </button>

                <button
                  onClick={() =>
                    navigate("/invoice/print/" + savedInvoice.invoiceNo)
                  }
                  className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
                >
                  ⬇ Download PDF
                </button>

              </div>

            </div>
          )}

    {/* Success Modal */}
    {showSuccessModal && (

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white rounded-xl shadow-xl w-[420px] p-6">

          <div className="text-center">

            <div className="text-5xl mb-4">
              ✅
            </div>

            <h2 className="text-xl font-bold text-green-600">
              Invoice Saved Successfully
            </h2>

            <p className="mt-4">
              Invoice No
            </p>

            <p className="font-bold text-xl">
              {savedInvoice?.invoiceNo}
            </p>

            <div className="flex justify-center gap-3 mt-6">

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/invoice/print/" + savedInvoice?.invoiceNo);
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded"
              >
                View
              </button>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/invoice/print/" + savedInvoice?.invoiceNo);
                }}
                className="bg-green-600 text-white px-5 py-2 rounded"
              >
                Print
              </button>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-gray-200 px-5 py-2 rounded"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      </div>

    )}

  </MainLayout>
);

}

export default InvoicePage;