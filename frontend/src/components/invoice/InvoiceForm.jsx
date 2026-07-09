import CustomerSection from "./CustomerSection";
function InvoiceForm() {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
  
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
  
          {/* Header */}
  
          <div className="bg-blue-700 text-white p-6 rounded-t-xl">
  
            <h1 className="text-3xl font-bold">
              FLEX MOBILE
            </h1>
  
            <p className="text-sm">
              Sales Invoice & Warranty
            </p>
  
          </div>
  
          {/* Body */}
  
          <div className="p-8">
  
            <h2 className="text-xl font-semibold mb-6">
              Create New Invoice
            </h2>
            <CustomerSection />

            {/* Invoice Details */}

            <div className="grid grid-cols-2 gap-6 mb-8">

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Invoice No
                    </label>

                    <input
                        type="text"
                        value="INV-000001"
                        readOnly
                        className="w-full border rounded-lg p-3 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Invoice Date
                    </label>

                    <input
                        type="date"
                        className="w-full border rounded-lg p-3"
                    />
                </div>

            </div>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default InvoiceForm;