import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import WarrantyTemplateForm from "./WarrantyTemplateForm";
import {
  saveWarrantyTemplate,
} from "../../services/warrantyTemplateService";

function WarrantyTemplateModal({
  open,
  onClose,
  category,
  brand,
}) {

  const [editingTemplate] = useState(null);

  if (!open) return null;

  const handleSave = async (template) => {

    try {

      const response = await saveWarrantyTemplate(template);

      toast.success("Warranty Template Saved Successfully");

      onClose();

      window.location.reload();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to save Warranty Template."
      );

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              Create Warranty Template
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Add a new warranty template without leaving Product Form.
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

        <div className="p-6">

          <WarrantyTemplateForm
            onSave={handleSave}
            onUpdate={() => {}}
            editingTemplate={editingTemplate}
            onCancelEdit={onClose}
            category={category}
            brand={brand}
          />

        </div>

      </div>

    </div>

  );

}

export default WarrantyTemplateModal;