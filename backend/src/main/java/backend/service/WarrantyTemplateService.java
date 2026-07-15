package backend.service;

import backend.entity.WarrantyTemplate;
import backend.repository.WarrantyTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarrantyTemplateService {

    private final WarrantyTemplateRepository warrantyTemplateRepository;

    public WarrantyTemplateService(
            WarrantyTemplateRepository warrantyTemplateRepository
    ) {
        this.warrantyTemplateRepository = warrantyTemplateRepository;
    }

    // ===========================
    // Save Warranty Template
    // ===========================
    public WarrantyTemplate saveWarrantyTemplate(WarrantyTemplate template) {

        // Duplicate Name Check
        if (warrantyTemplateRepository
                .findByTemplateName(template.getTemplateName())
                .isPresent()) {

            throw new RuntimeException(
                    "Warranty Template Name Already Exists."
            );
        }

        // Auto Generate Code
        template.setTemplateCode(generateTemplateCode());

        return warrantyTemplateRepository.save(template);
    }

    // ===========================
    // Get All Templates
    // ===========================
    public List<WarrantyTemplate> getAllTemplates() {
        return warrantyTemplateRepository.findAll();
    }

    // ===========================
    // Get By Id
    // ===========================
    public WarrantyTemplate getTemplateById(Long id) {

        return warrantyTemplateRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Warranty Template Not Found"));

    }

    // ===========================
    // Update Warranty Template
    // ===========================
    public WarrantyTemplate updateTemplate(Long id, WarrantyTemplate updatedTemplate) {

        WarrantyTemplate template = warrantyTemplateRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Warranty Template Not Found"));

        // Duplicate Name Check
        warrantyTemplateRepository.findByTemplateName(updatedTemplate.getTemplateName())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("Warranty Template Name Already Exists.");
                    }
                });

        template.setTemplateName(updatedTemplate.getTemplateName());
        template.setWarrantyTitle(updatedTemplate.getWarrantyTitle());
        template.setWarrantyMonths(updatedTemplate.getWarrantyMonths());
        template.setTermsAndConditions(updatedTemplate.getTermsAndConditions());

        return warrantyTemplateRepository.save(template);
    }

    // ===========================
    // Delete
    // ===========================
    public void deleteTemplate(Long id) {

        warrantyTemplateRepository.deleteById(id);

    }

    // ===========================
    // Auto Code Generator
    // ===========================
    private String generateTemplateCode() {

        long count = warrantyTemplateRepository.count() + 1;

        return String.format("WT-%03d", count);

    }

}