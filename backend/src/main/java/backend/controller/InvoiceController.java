package backend.controller;

import backend.dto.InvoiceRequest;
import backend.dto.InvoicePrintResponse;
import backend.dto.DeleteInvoiceRequest;

import backend.entity.Invoice;

import backend.service.InvoiceService;
import backend.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final AuthService authService;

    public InvoiceController(
            InvoiceService invoiceService,
            AuthService authService
    ) {
        this.invoiceService = invoiceService;
        this.authService = authService;
    }

    // =====================================================
    // SAVE INVOICE
    // =====================================================

    @PostMapping
    public Invoice saveInvoice(
            @RequestBody InvoiceRequest request
    ) {

        System.out.println(
                "Phone : " + request.getPhone()
        );

        System.out.println(
                "Name : " + request.getName()
        );

        System.out.println(
                "Address : " + request.getAddress()
        );

        return invoiceService.saveInvoice(request);
    }

    // =====================================================
    // GET ALL INVOICES
    // =====================================================

    @GetMapping
    public List<Invoice> getAllInvoices() {

        return invoiceService.getAllInvoices();
    }

    // =====================================================
    // GET INVOICE FOR PRINT
    // =====================================================

    @GetMapping("/print/{invoiceNo}")
    public InvoicePrintResponse getInvoiceForPrint(
            @PathVariable String invoiceNo
    ) {

        return invoiceService
                .getInvoiceForPrint(invoiceNo);
    }

    // =====================================================
    // GET INVOICE BY NUMBER
    // =====================================================

    @GetMapping("/{invoiceNo}")
    public Invoice getInvoiceByNo(
            @PathVariable String invoiceNo
    ) {

        return invoiceService
                .getInvoiceByNo(invoiceNo)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invoice Not Found"
                        )
                );
    }

    // =====================================================
    // GET LATEST INVOICE
    // =====================================================

    @GetMapping("/latest")
    public ResponseEntity<?> getLatestInvoice() {

        Invoice invoice =
                invoiceService.getLatestInvoice();

        if (invoice == null) {

            return ResponseEntity
                    .noContent()
                    .build();
        }

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "invoiceNo",
                invoice.getInvoiceNo()
        );

        response.put(
                "customerName",
                invoice.getCustomer().getName()
        );

        response.put(
                "date",
                invoice.getInvoiceDate()
        );

        response.put(
                "paymentMethod",
                invoice.getPaymentMethod()
        );

        response.put(
                "total",
                invoice.getTotalAmount()
        );

        return ResponseEntity.ok(response);
    }

    // =====================================================
    // DELETE INVOICE
    // =====================================================

    @DeleteMapping("/{invoiceNo}")
    public ResponseEntity<?> deleteInvoice(
            @PathVariable String invoiceNo,
            @RequestBody DeleteInvoiceRequest request,
            HttpServletRequest httpRequest
    ) {

        try {

            // ---------------------------------------------
            // 1. Check logged-in admin session
            // ---------------------------------------------

            String token =
                    extractToken(httpRequest);

            authService.getAdminByToken(token);

            // ---------------------------------------------
            // 2. Verify admin username + password
            // ---------------------------------------------

            authService.verifyAdminCredentials(
                    request.getUsername(),
                    request.getPassword()
            );

            // ---------------------------------------------
            // 3. Delete invoice
            // ---------------------------------------------

            invoiceService.deleteInvoice(invoiceNo);

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Invoice deleted successfully"
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(401)
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    // =====================================================
    // EXTRACT BEARER TOKEN
    // =====================================================

    private String extractToken(
            HttpServletRequest request
    ) {

        String header =
                request.getHeader(
                        "Authorization"
                );

        if (header == null ||
                !header.startsWith("Bearer ")) {

            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        return header.substring(7);
    }
}