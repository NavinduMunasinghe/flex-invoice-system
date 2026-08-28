package backend.repository;

import backend.entity.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceItemRepository
        extends JpaRepository<InvoiceItem, Long> {

    List<InvoiceItem> findByInvoiceId(Long invoiceId);

    @Modifying
    @Query("DELETE FROM InvoiceItem i WHERE i.invoice.id = :invoiceId")
    void deleteByInvoiceId(@Param("invoiceId") Long invoiceId);
}