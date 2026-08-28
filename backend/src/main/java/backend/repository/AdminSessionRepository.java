package backend.repository;

import backend.entity.AdminSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminSessionRepository
        extends JpaRepository<AdminSession, Long> {

    Optional<AdminSession> findByToken(String token);

    void deleteByToken(String token);
}