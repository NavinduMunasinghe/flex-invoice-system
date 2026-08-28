import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceForPrint } from "../services/invoiceService";
import logo from "../assets/flex-logo.png";
import html2pdf from "html2pdf.js";

function PrintInvoice() {

  const { invoiceNo } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const invoiceRef = useRef(null);

  const downloadPDF = () => {

    if (!invoiceRef.current) return;

    const options = {
      margin: 0.2,
      filename: `${invoice.invoiceNo}.pdf`,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(options)
      .from(invoiceRef.current)
      .save();

  };

  const loadInvoice = async () => {

    try {

      const response = await getInvoiceForPrint(invoiceNo);

      console.log(response.data);

      setInvoice(response.data);

      setLoading(false);

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

      <div className="flex justify-center mb-5 print:hidden">

        <button
          onClick={downloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
        >
          ⬇ Download PDF
        </button>

      </div>

      <div
        ref={invoiceRef}
        className="bg-white mx-auto shadow-lg p-6"
        style={{
          width: "210mm",
          minHeight: "145mm"
        }}
      >

        {/* Header */}

        <div className="flex justify-between items-start border-b border-black pb-3">

          <img
            src={logo}
            alt="logo"
            className="w-32"
          />

          <div className="text-center">

            <h2 className="text-lg font-bold underline">
              INVOICE
            </h2>

          </div>

          <div className="text-right">

            <h1 className="text-xl font-bold">
              FLEX MOBILE
            </h1>

            <p className="text-[11px] font-semibold">
              Mobile Accessories Store
            </p>

            <p className="text-[10px]">
              Mob : 0717006123
            </p>

            <p className="text-[10px]">
              flexmobileonline@gmail.com
            </p>

          </div>

        </div>
        {/* Customer */}

        <div className="grid grid-cols-2 mt-4 text-[12px]">

          <div className ="space-y-1">

            <p className="m-0">
              <strong>Customer :</strong> {invoice.customerName}
            </p>

            <p className="m-0">
              <strong>Phone :</strong> {invoice.customerPhone}
            </p>

          </div>

          <div className="text-right space-y-1">

            <p className="m-0">
              <strong>Invoice :</strong> {invoice.invoiceNo}
            </p>

            <p className="m-0">
              <strong>Date :</strong> {invoice.invoiceDate}
            </p>

            <p className="m-0">
              <strong>Payment :</strong> {invoice.paymentMethod}
            </p>

          </div>

          </div>

          {/* Product Table */}
          <table className="w-full border border-black mt-4 text-[11px]">

          <thead>

            <tr>

              <th className="border border-black py-1 px-2">
                Code
              </th>

              <th className="border border-black py-1 px-2">
                Product Name
              </th>

              <th className="border border-black py-1 px-2">
                Serial Number
              </th>

              <th className="border border-black py-1 px-2">
                Warranty
              </th>

              <th className="border border-black py-1 px-2">
                Qty
              </th>

              <th className="border border-black py-1 px-2">
                Unit Price
              </th>

              <th className="border border-black py-1 px-2">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

              {invoice.items.map((item, index) => (

                <tr key={index}>

                  <td className="border border-black py-1 px-2">
                    {item.productCode}
                  </td>

                  <td className="border border-black py-1 px-2">
                    {item.productName}
                  </td>

                  <td className="border border-black py-1 px-2">
                    {item.serialNumber}
                  </td>

                  <td className="border border-black py-1 px-2 text-center">
                    {item.warrantyMonths} Months
                  </td>

                  <td className="border border-black py-1 px-2 text-center">
                    {item.quantity}
                  </td>

                  <td className="border border-black py-1 px-2 text-right">
                    Rs. {Number(item.unitPrice).toFixed(2)}
                  </td>

                  <td className="border border-black py-1 px-2 text-right">
                    Rs. {Number(item.amount).toFixed(2)}
                  </td>

                </tr>

              ))}

              <tr>

              <td
                colSpan="6"
                className="border border-black py-1 px-2 text-right font-bold"
              >
                TOTAL
              </td>

              <td className="border border-black py-1 px-2 text-right font-bold">
                Rs. {Number(invoice.totalAmount).toFixed(2)}
              </td>

            </tr>

          </tbody>

        </table>

        {/* Payment Notes */}

        <div className="mt-4 text-[10px] leading-4">

        <h3 className="font-bold border-b border-black pb-1 mb-1">
          PAYMENT NOTES
        </h3>

        <p>
          Payment should be made payable to <strong>FLEX MOBILE</strong>.
          Goods sold are not refundable unless covered under the warranty
          policy.
        </p>

        </div>

        {/* Terms & Conditions */}

        <div className="mt-4 text-[10px]">

        <h3 className="font-bold border-b border-black pb-1 mb-2">
          WARRANTY TERMS & CONDITIONS
        </h3>

        <div className="leading-[15px] whitespace-pre-line">
          {invoice.items[0]?.warrantyTerms}
        </div>

        </div>
        {/* Signature */}

        {/* Signature Section */}

        <div className="grid grid-cols-2 mt-8 text-[11px]">

        <div>

          <div className="border-t border-black w-48 pt-1">
            Customer Signature
          </div>

        </div>

        <div className="flex justify-end">

          <div className="border-t border-black w-48 pt-1 text-center">
            Authorized Signature
          </div>

        </div>

        </div>
        {/* Footer */}

        <div
          style={{
            marginTop: "5px",
            paddingTop: "6px",
            textAlign: "center",
          }}
        >

          <h3
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              margin: 0,
            }}
          >
            THANK YOU FOR SHOPPING WITH FLEX MOBILE
          </h3>

          <p
            style={{
              marginTop: "-2px",
              fontSize: "11px",
            }}
          >
            Mobile Accessories Store | Tel : 0717006123
          </p>

        </div>
      </div>

    </div>
    
  );
  

}

export default PrintInvoice;