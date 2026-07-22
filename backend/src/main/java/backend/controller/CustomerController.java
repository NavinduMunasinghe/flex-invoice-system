package backend.controller;

import backend.dto.CustomerSearchDTO;
import backend.entity.Customer;
import backend.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import backend.dto.CustomerSearchDTO;
@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Save Customer
    @PostMapping
    public Customer saveCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    // Get All Customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // Search Customer by Phone
    @GetMapping("/search")
    public Optional<Customer> searchCustomer(@RequestParam String phone) {
        return customerService.getCustomerByPhone(phone);
    }

    @GetMapping("/history")
    public List<CustomerSearchDTO> getPurchaseHistory(
            @RequestParam(required = false) String keyword) {

        return customerService.searchPurchaseHistory(keyword);
}
}