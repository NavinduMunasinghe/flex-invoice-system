import api from "./api";

// Save Product
export const saveProduct = async (product) => {
  return await api.post("/products", product);
};

// Get All Products
export const getProducts = async () => {
  return await api.get("/products");
};

// Get Product By ID
export const getProductById = async (id) => {
  return await api.get(`/products/${id}`);
};

// Delete Product
export const deleteProduct = async (id) => {
  return await api.delete(`/products/${id}`);
};

