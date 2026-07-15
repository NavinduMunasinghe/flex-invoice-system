console.log("Warranty Service Loaded");
import api from "./api";

// Get All Warranty Templates
export const getWarrantyTemplates = async () => {
  return await api.get("/warranty-templates");
};

// Get Warranty Template By Id
export const getWarrantyTemplateById = async (id) => {
  return await api.get(`/warranty-templates/${id}`);
};

// Save Warranty Template
export const saveWarrantyTemplate = async (template) => {
  return await api.post("/warranty-templates", template);
};

// Update Warranty Template
export const updateWarrantyTemplate = async (id, template) => {
  return await api.put(`/warranty-templates/${id}`, template);
};

// Delete Warranty Template
export const deleteWarrantyTemplate = async (id) => {
  return await api.delete(`/warranty-templates/${id}`);
};