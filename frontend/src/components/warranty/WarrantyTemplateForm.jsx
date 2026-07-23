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

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">

        {editingTemplate
          ? "Update Warranty Template"
          : "Create Warranty Template"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-5"
      >

        <div>

          <label className="block text-sm font-semibold mb-2">
            Template Name
          </label>

          <input
            type="text"
            value={template.templateName}
            onChange={(e) =>
              handleChange("templateName", e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        <div>

          <label className="block text-sm font-semibold mb-2">
            Warranty Months
          </label>

          <input
            type="number"
            value={template.warrantyMonths}
            onChange={(e) =>
              handleChange("warrantyMonths", e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        <div className="col-span-2">

          <label className="block text-sm font-semibold mb-2">
            Warranty Title
          </label>

          <input
            type="text"
            value={template.warrantyTitle}
            onChange={(e) =>
              handleChange("warrantyTitle", e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        <div className="col-span-2">

          <label className="block text-sm font-semibold mb-2">
            Terms & Conditions
          </label>

          <textarea
            rows={8}
            value={template.termsAndConditions}
            onChange={(e) =>
              handleChange(
                "termsAndConditions",
                e.target.value
              )
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm resize-y min-h-[50px] max-h-[600px] focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        <div className="col-span-2 flex gap-3">

          <button
            type="submit"
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              editingTemplate
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editingTemplate
              ? "Update Template"
              : "Save Template"}
          </button>

          <button
            type="button"
            onClick={clearForm}
            className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Clear
          </button>

        </div>

      </form>

    </div>

  );

}

export default WarrantyTemplateForm;