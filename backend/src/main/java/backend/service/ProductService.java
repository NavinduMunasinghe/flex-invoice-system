package backend.service;

import backend.entity.Product;
import backend.entity.WarrantyTemplate;
import backend.repository.ProductRepository;
import backend.repository.WarrantyTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final WarrantyTemplateRepository warrantyTemplateRepository;

    public ProductService(
            ProductRepository productRepository,
            WarrantyTemplateRepository warrantyTemplateRepository
    ) {
        this.productRepository = productRepository;
        this.warrantyTemplateRepository = warrantyTemplateRepository;
    }

    // ==========================
    // Save Product
    // ==========================
    public Product saveProduct(Product product) {

        if (product.getWarrantyTemplateId() != null) {

            WarrantyTemplate template = warrantyTemplateRepository
                    .findById(product.getWarrantyTemplateId())
                    .orElseThrow(() ->
                            new RuntimeException("Warranty Template Not Found"));

            product.setWarrantyMonths(template.getWarrantyMonths());

        } else {

            // No Warranty
            product.setWarrantyMonths(0);

        }

        return productRepository.save(product);
    }

    // ==========================
    // Update Product
    // ==========================
    public Product updateProduct(Long id, Product product) {

        Product existing = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product Not Found"));

        existing.setProductCode(product.getProductCode());
        existing.setBarcode(product.getBarcode());
        existing.setCategory(product.getCategory());
        existing.setBrand(product.getBrand());
        existing.setModel(product.getModel());
        existing.setProductName(product.getProductName());
        existing.setBuyingPrice(product.getBuyingPrice());
        existing.setSellingPrice(product.getSellingPrice());

        if (product.getWarrantyTemplateId() != null) {

            WarrantyTemplate template = warrantyTemplateRepository
                    .findById(product.getWarrantyTemplateId())
                    .orElseThrow(() ->
                            new RuntimeException("Warranty Template Not Found"));

            existing.setWarrantyTemplateId(template.getId());
            existing.setWarrantyMonths(template.getWarrantyMonths());

        } else {

            existing.setWarrantyTemplateId(null);
            existing.setWarrantyMonths(0);

        }

        existing.setStockQty(product.getStockQty());
        existing.setStatus(product.getStatus());

        return productRepository.save(existing);
    }

    // ==========================
    // Get All Products
    // ==========================
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ==========================
    // Get Product By ID
    // ==========================
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // ==========================
    // Get Product By Code
    // ==========================
    public Optional<Product> getProductByCode(String productCode) {
        return productRepository.findByProductCode(productCode);
    }

    // ==========================
    // Delete Product
    // ==========================
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

}