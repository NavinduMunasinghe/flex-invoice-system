package backend.repository;

import backend.dto.CustomerSearchDTO;
import backend.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    Optional<Invoice> findByInvoiceNo(String invoiceNo);

    // Latest saved invoice
    Optional<Invoice> findTopByOrderByIdDesc();

    // Get last invoice ID
    @Query("SELECT MAX(i.id) FROM Invoice i")
    Long getLastInvoiceId();

    @Query("""
    SELECT new backend.dto.CustomerSearchDTO(
        i.invoiceNo,
        i.invoiceDate,
        c.id,
        c.name,
        c.phone,
        ii.productCode,
        ii.productName,
        ii.serialNumber
    )
    FROM InvoiceItem ii
    JOIN ii.invoice i
    JOIN i.customer c
    WHERE
    (:keyword IS NULL OR :keyword = '' OR
    LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
    LOWER(c.phone) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
    LOWER(i.invoiceNo) LIKE LOWER(CONCAT('%', :keyword, '%')))
    ORDER BY i.id DESC
    """)
    List<CustomerSearchDTO> searchPurchaseHistory(
            @Param("keyword") String keyword
    );

}