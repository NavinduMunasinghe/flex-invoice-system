package backend.controller;

import backend.dto.InvoiceRequest;
import backend.entity.Invoice;
import backend.service.InvoiceService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backend.dto.InvoicePrintResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    // Save Invoice
    @PostMapping
    public Invoice saveInvoice(@RequestBody InvoiceRequest request) {

    System.out.println("Phone : " + request.getPhone());
    System.out.println("Name : " + request.getName());
    System.out.println("Address : " + request.getAddress());

    return invoiceService.saveInvoice(request);
}

    // Get All Invoices
    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/print/{invoiceNo}")
    public InvoicePrintResponse getInvoiceForPrint(
            @PathVariable String invoiceNo) {

        return invoiceService.getInvoiceForPrint(invoiceNo);

}

    @GetMapping("/{invoiceNo}")
    public Invoice getInvoiceByNo(@PathVariable String invoiceNo) {

        return invoiceService
                .getInvoiceByNo(invoiceNo)
                .orElseThrow(() -> new RuntimeException("Invoice Not Found"));

}
    @GetMapping("/latest")
public ResponseEntity<?> getLatestInvoice() {

    Invoice invoice = invoiceService.getLatestInvoice();

    if (invoice == null) {
        return ResponseEntity.noContent().build();
    }

    Map<String, Object> response = new HashMap<>();

    response.put("invoiceNo", invoice.getInvoiceNo());
    response.put("customerName", invoice.getCustomer().getName());
    response.put("date", invoice.getInvoiceDate());
    response.put("paymentMethod", invoice.getPaymentMethod());
    response.put("total", invoice.getTotalAmount());

    return ResponseEntity.ok(response);

}
    
}
