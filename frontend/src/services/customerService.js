import api from "./api";

// Save Customer
export const saveCustomer = async (customer) => {
  return await api.post("/customers", customer);
};

// Get All Customers
export const getCustomers = async () => {
  return await api.get("/customers");
};

// Search Customer by Phone
export const searchCustomer = async (phone) => {
  return await api.get(`/customers/search?phone=${phone}`);
};