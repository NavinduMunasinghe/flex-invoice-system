import { useState } from "react";
import CustomerSection from "../components/invoice/CustomerSection";
import ProductSection from "../components/invoice/ProductSection";
import { saveInvoice } from "../services/invoiceService";
import logo from "../assets/flex-logo.png";

function InvoicePage() {

  const [customer, setCustomer] = useState({
    id: "",
    phone: "",
    name: "",
    address: "",
  });

  const [items, setItems] = useState([
    {
      productId: "",
      product: "",
      serial: "",
      qty: 1,
      price: 0,
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const total = items.reduce(
    (sum, item) => sum + Number(item.qty) * Number(item.price),
    0
  );

    const handleSave = async () => {

      if (!customer.phone) {
        alert("Enter customer phone number.");
        return;
      }
    
      if (!customer.name) {
        alert("Enter customer name.");
        return;
      }
    
      const validItems = items.filter(item => item.productId);
    
      if (validItems.length === 0) {
        alert("Please add at least one product.");
        return;
      }
    
      const request = {
    
        phone: customer.phone,
        name: customer.name,
        address: customer.address,
    
        paymentMethod: paymentMethod,
    
        items: validItems.map(item => ({
          productId: item.productId,
          serialNumber: item.serial,
          quantity: Number(item.qty),
          unitPrice: Number(item.price)
        }))
    
      };
    
      try {
    
        const response = await saveInvoice(request);
    
        alert(
          "Invoice Saved Successfully!\nInvoice No : " +
          response.data.invoiceNo
        );
    
        console.log(response.data);
    
      } catch (error) {

        console.log(error);
      
        console.log(error.response);
      
        alert(JSON.stringify(error.response?.data));
      
      }
    
    };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-5">
        {/* Header */}

        <div className="border-b border-gray-400 pb-2">

              <div className="grid grid-cols-3 items-start">

                  {/* Logo */}

                  <div>

                      <img
                          src={logo}
                          alt="Flex Mobile"
                          className="w-36"
                      />

                  </div>

                  {/* Invoice */}

                  <div className="text-center">

                      <h2 className="text-[14px] font-bold underline">
                          INVOICE
                      </h2>

                  </div>

                  {/* Company */}

                  <div className="text-center">

                      <h1 className="text-[16px] font-bold">
                          FLEX MOBILE
                      </h1>

                      <p className="text-[10px] font-bold">
                          Mobile Accessories Store
                      </p>

                      <p className="text-[9px]">
                          Mob : 0717006123
                      </p>

                      <p className="text-[9px]">
                          Email : flexmobileonline@gmail.com
                      </p>

                  </div>

              </div>

          </div>

        </div>

        <CustomerSection
          customer={customer}
          setCustomer={setCustomer}
        />

        <ProductSection
          items={items}
          setItems={setItems}
        />

        <div className="flex justify-between items-center mt-8">

        <div className="flex justify-end mt-4">

        <div className="border border-gray-300 px-5 py-2 rounded">

          <p className="text-[10px] font-bold">
            Total
          </p>

          <p className="text-[14px] font-bold">
            Rs. {total.toFixed(2)}
          </p>

        </div>

        </div>

          <div className="flex gap-3">

            <button
              onClick={handleSave}
              className="print:hidden bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm"
            >
              Save Invoice
            </button>

            <button
              onClick={handlePrint}
              className="print:hidden bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm"
            >
              Print Invoice
            </button>

          </div>

        </div>

      </div>

  );
}

export default InvoicePage;