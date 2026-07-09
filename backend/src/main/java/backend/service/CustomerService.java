package backend.service;

import backend.entity.Customer;
import backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
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
}