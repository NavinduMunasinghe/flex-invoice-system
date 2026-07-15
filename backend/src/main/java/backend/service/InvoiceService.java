package backend.service;

import backend.dto.InvoiceItemRequest;
import backend.dto.InvoiceRequest;
import backend.entity.Customer;
import backend.entity.Invoice;
import backend.entity.InvoiceItem;
import backend.entity.Product;
import backend.repository.CustomerRepository;
import backend.repository.InvoiceItemRepository;
import backend.repository.InvoiceRepository;
import backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.dto.InvoiceItemResponse;
import backend.dto.InvoicePrintResponse;

import java.util.ArrayList;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemRepository invoiceItemRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public InvoiceService(
            InvoiceRepository invoiceRepository,
            InvoiceItemRepository invoiceItemRepository,
            CustomerRepository customerRepository,
            ProductRepository productRepository
    ) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceItemRepository = invoiceItemRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

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

            // Update details if changed
            customer.setName(request.getName());
            customer.setAddress(request.getAddress());

            customer = customerRepository.save(customer);

        }

        Invoice invoice = new Invoice();

        invoice.setCustomer(customer);
        invoice.setInvoiceDate(LocalDate.now());
        invoice.setPaymentMethod(request.getPaymentMethod());

        // Temporary invoice number
        invoice.setInvoiceNo("INV-" + System.currentTimeMillis());
        invoice.setTotalAmount(BigDecimal.ZERO);

        BigDecimal total = BigDecimal.ZERO;

        Invoice savedInvoice = invoiceRepository.save(invoice);

        List<InvoiceItemRequest> items = request.getItems();

        for (InvoiceItemRequest dto : items) {

            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            InvoiceItem item = new InvoiceItem();

            item.setInvoice(savedInvoice);
            item.setProduct(product);

            item.setSerialNumber(dto.getSerialNumber());
            item.setQuantity(dto.getQuantity());

            item.setUnitPrice(dto.getUnitPrice());

            BigDecimal amount = dto.getUnitPrice()
                    .multiply(BigDecimal.valueOf(dto.getQuantity()));

            item.setAmount(amount);

            item.setWarrantyMonths(product.getWarrantyMonths());

            item.setWarrantyExpiry(
                    LocalDate.now().plusMonths(product.getWarrantyMonths())
            );

            invoiceItemRepository.save(item);

            total = total.add(amount);
        }

        savedInvoice.setTotalAmount(total);

        return invoiceRepository.save(savedInvoice);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public java.util.Optional<Invoice> getInvoiceByNo(String invoiceNo) {

        return invoiceRepository.findByInvoiceNo(invoiceNo);
    
    }

    public InvoicePrintResponse getInvoiceForPrint(String invoiceNo) {

        Invoice invoice = invoiceRepository.findByInvoiceNo(invoiceNo)
                .orElseThrow(() -> new RuntimeException("Invoice Not Found"));
    
        List<InvoiceItem> invoiceItems =
                invoiceItemRepository.findByInvoiceId(invoice.getId());
    
        InvoicePrintResponse response = new InvoicePrintResponse();
    
        response.setInvoiceNo(invoice.getInvoiceNo());
        response.setInvoiceDate(invoice.getInvoiceDate());
        response.setPaymentMethod(invoice.getPaymentMethod());
    
        response.setCustomerName(invoice.getCustomer().getName());
        response.setCustomerPhone(invoice.getCustomer().getPhone());
    
        response.setTotalAmount(invoice.getTotalAmount());
    
        List<InvoiceItemResponse> itemResponses = new ArrayList<>();
    
        for (InvoiceItem item : invoiceItems) {
    
            InvoiceItemResponse dto = new InvoiceItemResponse();
    
            dto.setProductCode(item.getProduct().getProductCode());
            dto.setProductName(item.getProduct().getProductName());
            dto.setSerialNumber(item.getSerialNumber());
    
            dto.setWarrantyMonths(item.getWarrantyMonths());
            dto.setWarrantyExpiry(item.getWarrantyExpiry());
    
            dto.setQuantity(item.getQuantity());
            dto.setUnitPrice(item.getUnitPrice());
            dto.setAmount(item.getAmount());
    
            itemResponses.add(dto);
        }
    
        response.setItems(itemResponses);
    
        return response;
    }
}