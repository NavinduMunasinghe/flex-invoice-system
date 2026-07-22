package backend.service;

import backend.entity.Product;
import backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Save Product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Update Product
    public Product updateProduct(Long id, Product product) {

        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        existing.setProductCode(product.getProductCode());
        existing.setBarcode(product.getBarcode());
        existing.setBrand(product.getBrand());
        existing.setModel(product.getModel());
        existing.setProductName(product.getProductName());
        existing.setBuyingPrice(product.getBuyingPrice());
        existing.setSellingPrice(product.getSellingPrice());
        existing.setWarrantyMonths(product.getWarrantyMonths());
        existing.setWarrantyTemplateId(product.getWarrantyTemplateId());
        existing.setStockQty(product.getStockQty());
        existing.setStatus(product.getStatus());

        return productRepository.save(existing);
    }

    // Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get Product By ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Get Product By Code
    public Optional<Product> getProductByCode(String productCode) {
        return productRepository.findByProductCode(productCode);
    }

    // Delete Product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    
}