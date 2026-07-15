import { useEffect, useState } from "react";
import {
  getWarrantyTemplates,
  deleteWarrantyTemplate,
} from "../../services/warrantyTemplateService";

function WarrantyTemplateTable({ onEdit, refresh }) {
  const [templates, setTemplates] = useState([]);

  // ==========================
  // Load Warranty Templates
  // ==========================
  async function loadTemplates() {
    console.log("Loading Warranty Templates...");

    try {
      const response = await getWarrantyTemplates();

      console.log("API Response:", response);
      console.log("API Data:", response.data);

      setTemplates(response.data);
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to load warranty templates.");
    }
  }

  useEffect(() => {
    loadTemplates();
  }, [refresh]);

  // ==========================
  // Delete Template
  // ==========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this template?"
    );

    if (!confirmDelete) return;

    try {
      await deleteWarrantyTemplate(id);

      alert("Warranty Template Deleted Successfully.");

      loadTemplates();
    } catch (error) {
      console.error(error);
      alert("Delete Failed.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold mb-5">
        Warranty Templates
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">
                Code
              </th>

              <th className="border px-3 py-2 text-left">
                Template Name
              </th>

              <th className="border px-3 py-2 text-left">
                Warranty Title
              </th>

              <th className="border px-3 py-2 text-center">
                Months
              </th>

              <th className="border px-3 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {templates.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No Warranty Templates Found
                </td>
              </tr>
            ) : (
              templates.map((template) => (
                <tr
                  key={template.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border px-3 py-2">
                    {template.templateCode}
                  </td>

                  <td className="border px-3 py-2">
                    {template.templateName}
                  </td>

                  <td className="border px-3 py-2">
                    {template.warrantyTitle}
                  </td>

                  <td className="border px-3 py-2 text-center">
                    {template.warrantyMonths}
                  </td>

                  <td className="border px-3 py-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(template)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(template.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
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
  );
}

export default WarrantyTemplateTable;