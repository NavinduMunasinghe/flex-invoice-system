package backend.service;

import backend.dto.CustomerSearchDTO;
import backend.entity.Customer;
import backend.repository.CustomerRepository;
import backend.repository.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final InvoiceRepository invoiceRepository;

    public CustomerService(CustomerRepository customerRepository,
                           InvoiceRepository invoiceRepository) {
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
    }

    // Save Customer
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    // Get All Customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Search Customer by Phone
    public Optional<Customer> getCustomerByPhone(String phone) {
        return customerRepository.findByPhone(phone);
    }

    // Purchase History
    public List<CustomerSearchDTO> searchPurchaseHistory(String keyword) {

        if (keyword == null) {
            keyword = "";
        }

        return invoiceRepository.searchPurchaseHistory(keyword);
    }
}