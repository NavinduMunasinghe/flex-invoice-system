package backend.dto;

import java.time.LocalDate;

public class CustomerSearchDTO {

    private String invoiceNo;
    private LocalDate invoiceDate;

    private Long customerId;
    private String customerName;
    private String phone;

    private String productCode;
    private String productName;
    private String serialNumber;

    public CustomerSearchDTO() {
    }

    public CustomerSearchDTO(
            String invoiceNo,
            LocalDate invoiceDate,
            Long customerId,
            String customerName,
            String phone,
            String productCode,
            String productName,
            String serialNumber
    ) {
        this.invoiceNo = invoiceNo;
        this.invoiceDate = invoiceDate;
        this.customerId = customerId;
        this.customerName = customerName;
        this.phone = phone;
        this.productCode = productCode;
        this.productName = productName;
        this.serialNumber = serialNumber;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public LocalDate getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(LocalDate invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }
}