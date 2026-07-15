package backend.service;

import backend.entity.WarrantyTemplateItem;
import backend.repository.WarrantyTemplateItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarrantyTemplateItemService {

    private final WarrantyTemplateItemRepository repository;

    public WarrantyTemplateItemService(WarrantyTemplateItemRepository repository) {
        this.repository = repository;
    }

    public WarrantyTemplateItem save(WarrantyTemplateItem item) {
        return repository.save(item);
    }

    public List<WarrantyTemplateItem> getByTemplate(Long templateId) {
        return repository.findByTemplateIdOrderBySortOrderAsc(templateId);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}