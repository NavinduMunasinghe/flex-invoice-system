import api from "./api";

// ============================================
// Purchase History
// ============================================

export const searchCustomers = async (keyword) => {
  return await api.get("/customers/history", {
    params: {
      keyword,
    },
  });
};

// ============================================
// Get Invoice Details
// ============================================

export const getCustomerInvoice = async (invoiceNo) => {
  return await api.get(`/customers/invoice/${invoiceNo}`);
};