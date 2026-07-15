package backend.repository;

import backend.entity.WarrantyTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WarrantyTemplateRepository
        extends JpaRepository<WarrantyTemplate, Long> {

    Optional<WarrantyTemplate> findByTemplateCode(String templateCode);

    Optional<WarrantyTemplate> findByTemplateName(String templateName);

}