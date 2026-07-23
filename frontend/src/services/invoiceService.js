import api from "./api";

// Save Invoice
export const saveInvoice = async (invoice) => {
  return await api.post("/invoices", invoice);
};

// Get Invoice By Invoice Number
export const getInvoiceByNo = async (invoiceNo) => {
  return await api.get(`/invoices/${invoiceNo}`);
};

// Get All Invoices
export const getInvoices = async () => {
  return await api.get("/invoices");
};

// Get Invoice For Print
export const getInvoiceForPrint = async (invoiceNo) => {
  return await api.get(`/invoices/print/${invoiceNo}`);
};
export const getLatestInvoice = () => {
  return api.get("/invoices/latest");
};