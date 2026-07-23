import { useEffect, useState } from "react";
import {
  getWarrantyTemplates,
  deleteWarrantyTemplate,
} from "../../services/warrantyTemplateService";

function WarrantyTemplateTable({ onEdit, refresh }) {

  const [templates, setTemplates] = useState([]);

  const loadTemplates = async () => {

    try {

      const response = await getWarrantyTemplates();

      setTemplates(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load warranty templates.");

    }

  };

  useEffect(() => {
    loadTemplates();
  }, [refresh]);

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this warranty template?"
      )
    )
      return;

    try {

      await deleteWarrantyTemplate(id);

      loadTemplates();

    } catch (error) {

      console.error(error);

      alert("Delete Failed.");

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-5">

        Warranty Template List

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-100">

              <th className="p-3 text-left">
                Code
              </th>

              <th className="p-3 text-left">
                Template Name
              </th>

              <th className="p-3 text-left">
                Warranty Title
              </th>

              <th className="p-3 text-center">
                Months
              </th>

              <th className="p-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {templates.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="text-center py-10 text-slate-500"
                >

                  No Warranty Templates Found

                </td>

              </tr>

            ) : (

              templates.map((template) => (

                <tr
                  key={template.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-3 font-medium">

                    {template.templateCode}

                  </td>

                  <td className="p-3">

                    {template.templateName}

                  </td>

                  <td className="p-3">

                    {template.warrantyTitle}

                  </td>

                  <td className="p-3 text-center">

                    {template.warrantyMonths} Months

                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          onEdit(template)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(template.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
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