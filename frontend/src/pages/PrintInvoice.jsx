import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceForPrint } from "../services/invoiceService";
import logo from "../assets/flex-logo.png";

function PrintInvoice() {

  const { invoiceNo } = useParams();

  const [invoice, setInvoice] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadInvoice = async () => {

    try {

      const response = await getInvoiceForPrint(invoiceNo);

      console.log(response.data);

      setInvoice(response.data);

      setLoading(false);

      setTimeout(() => {

        window.print();

      }, 500);

    } catch (error) {

      console.error(error);

      alert("Cannot load invoice.");

    }

  };

  useEffect(() => {

    loadInvoice();
 
 }, []);

  if (loading) {

    return (

      <div className="p-10 text-center">

        Loading Invoice...

      </div>

    );

  }

  return (

    <div className="bg-gray-200 min-h-screen py-6">
  
      <div
        className="bg-white mx-auto shadow-lg p-6"
        style={{
          width: "210mm",
          minHeight: "145mm"
        }}
      >
  
        {/* Header */}
  
        <div className="flex justify-between items-start border-b pb-3">
  
          <img
            src={logo}
            alt="logo"
            className="w-36"
          />
  
          <div className="text-center">
  
            <h2 className="text-lg font-bold underline">
              INVOICE
            </h2>
  
          </div>
  
          <div className="text-right">
  
            <h1 className="text-2xl font-bold">
              FLEX MOBILE
            </h1>
  
            <p className="text-sm font-semibold">
              Mobile Accessories Store
            </p>
  
            <p className="text-xs">
              Mob : 0717006123
            </p>
  
            <p className="text-xs">
              flexmobileonline@gmail.com
            </p>
  
          </div>
  
        </div>
  
        {/* Customer */}
  
        <div className="grid grid-cols-2 mt-5 text-sm">
  
          <div>
  
            <p>
              <strong>Customer :</strong>
              {invoice.customerName}
            </p>
  
            <p className="mt-2">
              <strong>Phone :</strong>
              {invoice.customerPhone}
            </p>

          </div>
  
          <div className="text-right">
            <p>
              <strong>Invoice :</strong>
              {invoice.invoiceNo}
            </p>
  
            <p className="mt-2">
              <strong>Date :</strong>
              {invoice.invoiceDate}
            </p>
  
            <p className="mt-2">
              <strong>Payment :</strong>
              {invoice.paymentMethod}
  
            </p>
  
          </div>
  
        </div>

        {/* Product Table */}

        <table className="w-full border border-black mt-6 text-xs">

        <thead>

          <tr>

            <th className="border border-black p-2">Code</th>

            <th className="border border-black p-2">
              Product Name
            </th>

            <th className="border border-black p-2">
              Serial Number
            </th>

            <th className="border border-black p-2">
              Warranty
            </th>

            <th className="border border-black p-2">
              Qty
            </th>

            <th className="border border-black p-2">
              Unit Price
            </th>

            <th className="border border-black p-2">
              Amount
            </th>

          </tr>

        </thead>

        <tbody>

          {invoice.items.map((item, index) => (

            <tr key={index}>

              <td className="border border-black p-2">
                {item.productCode}
              </td>

              <td className="border border-black p-2">
                {item.productName}
              </td>

              <td className="border border-black p-2">
                {item.serialNumber}
              </td>

              <td className="border border-black p-2 text-center">
                {item.warrantyMonths} Months
              </td>

              <td className="border border-black p-2 text-center">
                {item.quantity}
              </td>

              <td className="border border-black p-2 text-right">
                Rs. {Number(item.unitPrice).toFixed(2)}
              </td>

              <td className="border border-black p-2 text-right">
                Rs. {Number(item.amount).toFixed(2)}
              </td>

            </tr>

          ))}

          <tr>

            <td
              colSpan="6"
              className="border border-black p-2 text-right font-bold"
            >
              Total
            </td>

            <td className="border border-black p-2 text-right font-bold">
              Rs. {Number(invoice.totalAmount).toFixed(2)}
            </td>

          </tr>

        </tbody>

        </table>

        {/* Payment Notes */}

        <div className="mt-6 text-xs">

        <h3 className="font-bold">
          PAYMENT NOTES
        </h3>

        <p className="mt-1">
          Payment should be made payable to FLEX MOBILE
          (Mobile Accessories Store)
        </p>

        </div>

        {/* Warranty */}

        <div className="mt-5 text-xs leading-5">

        <h3 className="font-bold">
          TERMS & CONDITIONS
        </h3>

        <p className="mt-2">
          Warranty Period :
          Products are covered by the seller warranty
          mentioned on the invoice.
        </p>

        <p>
          Original invoice must be produced for all
          warranty claims.
        </p>

        <p>
          Product serial number must remain intact.
        </p>

        <p>
          Physical damage, water damage, accidental
          damage, software issues and unauthorized
          repairs are not covered under warranty.
        </p>

        <p>
          Warranty is valid only for the original
          purchaser.
        </p>

        <p>
          FLEX MOBILE reserves the right to reject
          any warranty claim that does not satisfy
          the above conditions.
        </p>

        </div>

        <div className="text-center mt-8">

        <h2 className="font-bold text-lg">
          Thank You For Shopping With FLEX MOBILE !
        </h2>

        </div>
  
      </div>
  
    </div>
  
  );

}

export default PrintInvoice;