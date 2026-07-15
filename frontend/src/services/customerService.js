import api from "./api";

export const searchCustomerByPhone = async (phone) => {
  return await api.get(`/customers/search?phone=${phone}`);
};

export const saveCustomer = async (customer) => {
  return await api.post("/customers", customer);
};

export const getCustomers = async () => {
  return await api.get("/customers");
};