package backend.controller;

import backend.entity.WarrantyTemplate;
import backend.service.WarrantyTemplateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warranty-templates")
@CrossOrigin(origins = "http://localhost:5173")
public class WarrantyTemplateController {

    private final WarrantyTemplateService warrantyTemplateService;

    public WarrantyTemplateController(
            WarrantyTemplateService warrantyTemplateService) {
        this.warrantyTemplateService = warrantyTemplateService;
    }

    // Save Template
    @PostMapping
    public WarrantyTemplate saveTemplate(
            @RequestBody WarrantyTemplate template) {

        return warrantyTemplateService.saveWarrantyTemplate(template);

    }

    // Get All Templates
    @GetMapping
    public List<WarrantyTemplate> getAllTemplates() {

        return warrantyTemplateService.getAllTemplates();

    }

    // Get By Id
    @GetMapping("/{id}")
    public WarrantyTemplate getTemplateById(
            @PathVariable Long id) {

        return warrantyTemplateService.getTemplateById(id);

    }

    // Update Template
    @PutMapping("/{id}")
    public WarrantyTemplate updateTemplate(
            @PathVariable Long id,
            @RequestBody WarrantyTemplate template) {

    return warrantyTemplateService.updateTemplate(id, template);

}

    // Delete
    @DeleteMapping("/{id}")
    public String deleteTemplate(
            @PathVariable Long id) {

        warrantyTemplateService.deleteTemplate(id);

        return "Warranty Template Deleted Successfully.";

    }

}