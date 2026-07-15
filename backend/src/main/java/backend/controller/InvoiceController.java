package backend.controller;

import backend.dto.InvoiceRequest;
import backend.entity.Invoice;
import backend.service.InvoiceService;
import org.springframework.web.bind.annotation.*;
import backend.dto.InvoicePrintResponse;

import java.util.List;

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

}