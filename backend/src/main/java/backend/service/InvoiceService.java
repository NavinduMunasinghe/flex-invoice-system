package backend.service;

import backend.dto.InvoiceItemRequest;
import backend.dto.InvoiceRequest;
import backend.dto.InvoiceItemResponse;
import backend.dto.InvoicePrintResponse;

import backend.entity.Customer;
import backend.entity.Invoice;
import backend.entity.InvoiceItem;
import backend.entity.Product;
import backend.entity.WarrantyTemplate;

import backend.repository.CustomerRepository;
import backend.repository.InvoiceItemRepository;
import backend.repository.InvoiceRepository;
import backend.repository.ProductRepository;
import backend.repository.WarrantyTemplateRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemRepository invoiceItemRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final WarrantyTemplateRepository warrantyTemplateRepository;

    public InvoiceService(
            InvoiceRepository invoiceRepository,
            InvoiceItemRepository invoiceItemRepository,
            CustomerRepository customerRepository,
            ProductRepository productRepository,
            WarrantyTemplateRepository warrantyTemplateRepository
    ) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceItemRepository = invoiceItemRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.warrantyTemplateRepository = warrantyTemplateRepository;
    }

    // =====================================================
    // SAVE INVOICE
    // =====================================================

    @Transactional
    public Invoice saveInvoice(InvoiceRequest request) {

        Customer customer = customerRepository
                .findByPhone(request.getPhone())
                .orElse(null);

        if (customer == null) {

            customer = new Customer();

            customer.setPhone(request.getPhone());
            customer.setName(request.getName());
            customer.setAddress(request.getAddress());

            customer = customerRepository.save(customer);

        } else {

            // Update customer details if changed
            customer.setName(request.getName());
            customer.setAddress(request.getAddress());

            customer = customerRepository.save(customer);
        }

        Invoice invoice = new Invoice();

        invoice.setCustomer(customer);
        invoice.setInvoiceDate(LocalDate.now());
        invoice.setPaymentMethod(request.getPaymentMethod());

        // =================================================
        // GENERATE NEXT INVOICE NUMBER
        // =================================================

        Invoice lastInvoice = invoiceRepository
                .findTopByOrderByInvoiceNoDesc()
                .orElse(null);

        long nextNumber = 1;

        if (lastInvoice != null &&
                lastInvoice.getInvoiceNo() != null) {

            String lastInvoiceNo =
                    lastInvoice.getInvoiceNo();

            String numberPart =
                    lastInvoiceNo.replace("FINV-", "");

            nextNumber =
                    Long.parseLong(numberPart) + 1;
        }

        String invoiceNo =
                String.format(
                        "FINV-%06d",
                        nextNumber
                );

        invoice.setInvoiceNo(invoiceNo);

        invoice.setTotalAmount(BigDecimal.ZERO);

        Invoice savedInvoice =
                invoiceRepository.save(invoice);

        // =================================================
        // SAVE INVOICE ITEMS
        // =================================================

        List<InvoiceItemRequest> items =
                request.getItems();

        BigDecimal total = BigDecimal.ZERO;

        for (InvoiceItemRequest dto : items) {

            Product product =
                    productRepository
                            .findById(dto.getProductId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Product not found"
                                    )
                            );

            InvoiceItem item =
                    new InvoiceItem();

            item.setInvoice(savedInvoice);
            item.setProduct(product);

            item.setProductCode(
                    product.getProductCode()
            );

            item.setProductName(
                    product.getProductName()
            );

            item.setSerialNumber(
                    dto.getSerialNumber()
            );

            item.setQuantity(
                    dto.getQuantity()
            );

            item.setUnitPrice(
                    dto.getUnitPrice()
            );

            BigDecimal amount =
                    dto.getUnitPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            dto.getQuantity()
                                    )
                            );

            item.setAmount(amount);

            // =================================================
            // WARRANTY
            // =================================================

            WarrantyTemplate template =
                    warrantyTemplateRepository
                            .findById(
                                    product.getWarrantyTemplateId()
                            )
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Warranty Template Not Found"
                                    )
                            );

            item.setWarrantyTemplateId(
                    template.getId()
            );

            item.setWarrantyTitle(
                    template.getWarrantyTitle()
            );

            item.setWarrantyTerms(
                    template.getTermsAndConditions()
            );

            item.setWarrantyMonths(
                    template.getWarrantyMonths()
            );

            item.setWarrantyExpiry(
                    LocalDate.now()
                            .plusMonths(
                                    template.getWarrantyMonths()
                            )
            );

            invoiceItemRepository.save(item);

            total = total.add(amount);
        }

        savedInvoice.setTotalAmount(total);

        return invoiceRepository.save(savedInvoice);
    }

    // =====================================================
    // GET ALL INVOICES
    // =====================================================

    public List<Invoice> getAllInvoices() {

        return invoiceRepository.findAll();
    }

    // =====================================================
    // GET INVOICE BY NUMBER
    // =====================================================

    public java.util.Optional<Invoice> getInvoiceByNo(
            String invoiceNo
    ) {

        return invoiceRepository
                .findByInvoiceNo(invoiceNo);
    }

    // =====================================================
    // GET INVOICE FOR PRINT
    // =====================================================

    public InvoicePrintResponse getInvoiceForPrint(
            String invoiceNo
    ) {

        Invoice invoice =
                invoiceRepository
                        .findByInvoiceNo(invoiceNo)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invoice Not Found"
                                )
                        );

        List<InvoiceItem> invoiceItems =
                invoiceItemRepository
                        .findByInvoiceId(
                                invoice.getId()
                        );

        InvoicePrintResponse response =
                new InvoicePrintResponse();

        response.setInvoiceNo(
                invoice.getInvoiceNo()
        );

        response.setInvoiceDate(
                invoice.getInvoiceDate()
        );

        response.setPaymentMethod(
                invoice.getPaymentMethod()
        );

        response.setCustomerName(
                invoice.getCustomer().getName()
        );

        response.setCustomerPhone(
                invoice.getCustomer().getPhone()
        );

        response.setTotalAmount(
                invoice.getTotalAmount()
        );

        List<InvoiceItemResponse> itemResponses =
                new ArrayList<>();

        for (InvoiceItem item : invoiceItems) {

            InvoiceItemResponse dto =
                    new InvoiceItemResponse();

            dto.setProductCode(
                    item.getProductCode()
            );

            dto.setProductName(
                    item.getProductName()
            );

            dto.setSerialNumber(
                    item.getSerialNumber()
            );

            dto.setWarrantyTitle(
                    item.getWarrantyTitle()
            );

            dto.setWarrantyTerms(
                    item.getWarrantyTerms()
            );

            dto.setWarrantyMonths(
                    item.getWarrantyMonths()
            );

            dto.setWarrantyExpiry(
                    item.getWarrantyExpiry()
            );

            dto.setQuantity(
                    item.getQuantity()
            );

            dto.setUnitPrice(
                    item.getUnitPrice()
            );

            dto.setAmount(
                    item.getAmount()
            );

            itemResponses.add(dto);
        }

        response.setItems(itemResponses);

        return response;
    }

    // =====================================================
    // GET LATEST INVOICE
    // =====================================================

    public Invoice getLatestInvoice() {

        return invoiceRepository
                .findTopByOrderByIdDesc()
                .orElse(null);
    }

    // =====================================================
    // DELETE INVOICE
    // =====================================================

    @Transactional
    public void deleteInvoice(String invoiceNo) {

        // Find invoice
        Invoice invoice =
                invoiceRepository
                        .findByInvoiceNo(invoiceNo)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invoice Not Found"
                                )
                        );

        Long invoiceId = invoice.getId();

        // Delete invoice items first
        invoiceItemRepository.deleteByInvoiceId(invoiceId);

        // Make sure invoice items are deleted
        invoiceItemRepository.flush();

        // Delete invoice
        invoiceRepository.deleteById(invoiceId);

        // Make sure invoice is deleted
        invoiceRepository.flush();
    }
}