package backend.service;

import backend.entity.InvoiceItem;
import backend.repository.InvoiceItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceItemService {

    private final InvoiceItemRepository repository;

    public InvoiceItemService(InvoiceItemRepository repository) {
        this.repository = repository;
    }

    public InvoiceItem saveItem(InvoiceItem item) {
        return repository.save(item);
    }

    public List<InvoiceItem> getItemsByInvoice(Long invoiceId) {
        return repository.findByInvoiceId(invoiceId);
    }

    public void deleteItem(Long id) {
        repository.deleteById(id);
    }
}