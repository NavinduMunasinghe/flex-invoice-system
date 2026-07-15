package backend.repository;

import backend.entity.WarrantyTemplateItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WarrantyTemplateItemRepository extends JpaRepository<WarrantyTemplateItem, Long> {

    List<WarrantyTemplateItem> findByTemplateIdOrderBySortOrderAsc(Long templateId);

}