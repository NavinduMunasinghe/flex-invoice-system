function CustomerSection() {
    return (
      <div className="bg-white rounded-xl border p-6 mt-6">
  
        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          Customer Details
        </h2>
  
        <div className="grid grid-cols-2 gap-5">
  
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>
  
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="0771234567"
                className="flex-1 border rounded-lg p-3"
              />
  
              <button
                className="bg-blue-600 text-white px-5 rounded-lg"
              >
                Search
              </button>
  
            </div>
          </div>
  
          <div>
            <label className="block mb-2 font-medium">
              Customer Name
            </label>
  
            <input
              type="text"
              placeholder="Customer Name"
              className="w-full border rounded-lg p-3"
            />
          </div>
  
          <div className="col-span-2">
  
            <label className="block mb-2 font-medium">
              Address
            </label>
  
            <textarea
              rows="3"
              placeholder="Customer Address"
              className="w-full border rounded-lg p-3"
            />
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default CustomerSection;