import { useEffect, useState } from "react";

function WarrantyTemplateForm({
  onSave,
  onUpdate,
  editingTemplate,
  onCancelEdit,
}) {
  const emptyTemplate = {
    templateName: "",
    warrantyTitle: "",
    warrantyMonths: "",
    termsAndConditions: "",
  };

  const [template, setTemplate] = useState(emptyTemplate);

  useEffect(() => {
    if (editingTemplate) {
      setTemplate({
        templateName: editingTemplate.templateName || "",
        warrantyTitle: editingTemplate.warrantyTitle || "",
        warrantyMonths: editingTemplate.warrantyMonths || "",
        termsAndConditions:
          editingTemplate.termsAndConditions || "",
      });
    } else {
      setTemplate(emptyTemplate);
    }
  }, [editingTemplate]);

  const handleChange = (field, value) => {
    setTemplate({
      ...template,
      [field]: value,
    });
  };

  const clearForm = () => {
    setTemplate(emptyTemplate);

    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!template.templateName.trim()) {
      alert("Template Name is required.");
      return;
    }

    if (!template.warrantyTitle.trim()) {
      alert("Warranty Title is required.");
      return;
    }

    if (!template.warrantyMonths) {
      alert("Warranty Months is required.");
      return;
    }

    if (!template.termsAndConditions.trim()) {
      alert("Terms & Conditions are required.");
      return;
    }

    if (editingTemplate) {
      onUpdate(editingTemplate.id, template);
    } else {
      onSave(template);
    }

    clearForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-6">
        {editingTemplate
          ? "Update Warranty Template"
          : "Warranty Template"}
      </h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Template Name
        </label>

        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3"
          value={template.templateName}
          onChange={(e) =>
            handleChange("templateName", e.target.value)
          }
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Warranty Title
        </label>

        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3"
          value={template.warrantyTitle}
          onChange={(e) =>
            handleChange("warrantyTitle", e.target.value)
          }
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Warranty Months
        </label>

        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-3"
          value={template.warrantyMonths}
          onChange={(e) =>
            handleChange("warrantyMonths", e.target.value)
          }
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Terms & Conditions
        </label>

        <textarea
          rows="8"
          className="w-full border border-gray-300 rounded-lg p-3"
          value={template.termsAndConditions}
          onChange={(e) =>
            handleChange(
              "termsAndConditions",
              e.target.value
            )
          }
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className={`text-white px-6 py-3 rounded-lg ${
            editingTemplate
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {editingTemplate ? "Update Template" : "Save Template"}
        </button>

        <button
          type="button"
          onClick={clearForm}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default WarrantyTemplateForm;