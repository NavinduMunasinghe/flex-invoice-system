import { useState } from "react";
import { ShieldCheck } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import WarrantyTemplateForm from "../components/warranty/WarrantyTemplateForm";
import WarrantyTemplateTable from "../components/warranty/WarrantyTemplateTable";

import {
  saveWarrantyTemplate,
  updateWarrantyTemplate,
} from "../services/warrantyTemplateService";

function WarrantyTemplatePage() {

  const [refresh, setRefresh] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const reloadTable = () => {
    setRefresh((prev) => !prev);
  };

  const handleSave = async (template) => {

    try {

      const response = await saveWarrantyTemplate(template);

      alert(
        "Warranty Template Saved Successfully.\n\nCode : " +
        response.data.templateCode
      );

      reloadTable();

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Save Failed.");
      } else {
        alert("Cannot connect to server.");
      }

    }

  };

  const handleUpdate = async (id, template) => {

    try {

      await updateWarrantyTemplate(id, template);

      alert("Warranty Template Updated Successfully.");

      setEditingTemplate(null);

      reloadTable();

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Update Failed.");
      } else {
        alert("Cannot connect to server.");
      }

    }

  };

  const handleEdit = (template) => {

    setEditingTemplate(template);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const cancelEdit = () => {
    setEditingTemplate(null);
  };

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 p-4 rounded-2xl">

              <ShieldCheck
                size={32}
                className="text-blue-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                Warranty Template Management
              </h1>

              <p className="text-slate-500 text-sm mt-1">
                Create, update and manage warranty templates.
              </p>

            </div>

          </div>

        </div>

        {/* Form */}

        <WarrantyTemplateForm
          onSave={handleSave}
          onUpdate={handleUpdate}
          editingTemplate={editingTemplate}
          onCancelEdit={cancelEdit}
        />

        {/* Table */}

        <WarrantyTemplateTable
          refresh={refresh}
          onEdit={handleEdit}
        />

      </div>

    </MainLayout>

  );

}

export default WarrantyTemplatePage;