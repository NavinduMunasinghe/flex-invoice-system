package backend.service;

import backend.dto.AdminProfileRequest;
import backend.dto.ChangePasswordRequest;
import backend.dto.LoginRequest;
import backend.dto.LoginResponse;
import backend.entity.Admin;
import backend.entity.AdminSession;
import backend.repository.AdminRepository;
import backend.repository.AdminSessionRepository;
import backend.util.PasswordUtil;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final AdminSessionRepository sessionRepository;

    public AuthService(
            AdminRepository adminRepository,
            AdminSessionRepository sessionRepository
    ) {
        this.adminRepository = adminRepository;
        this.sessionRepository = sessionRepository;
    }

    public LoginResponse login(LoginRequest request) {

        Admin admin = adminRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid username or password"
                        )
                );

        if (!PasswordUtil.matches(
                request.getPassword(),
                admin.getPassword()
        )) {
            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        String token =
                UUID.randomUUID().toString()
                        + UUID.randomUUID();

        AdminSession session =
                new AdminSession();

        session.setToken(token);
        session.setAdmin(admin);

        // Login session = 12 hours
        session.setExpiresAt(
                LocalDateTime.now().plusHours(12)
        );

        sessionRepository.save(session);

        return createResponse(
                admin,
                token
        );
    }

    public void logout(String token) {

        if (token != null) {
            sessionRepository.deleteByToken(token);
        }
    }

    public Admin getAdminByToken(String token) {

        AdminSession session =
                sessionRepository
                        .findByToken(token)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Unauthorized"
                                )
                        );

        if (session.getExpiresAt()
                .isBefore(LocalDateTime.now())) {

            sessionRepository.delete(session);

            throw new RuntimeException(
                    "Session expired"
            );
        }

        return session.getAdmin();
    }

    public LoginResponse getProfile(
            String token
    ) {

        Admin admin =
                getAdminByToken(token);

        return createResponse(
                admin,
                null
        );
    }

    public LoginResponse updateProfile(
            String token,
            AdminProfileRequest request
    ) {

        Admin admin =
                getAdminByToken(token);

        if (request.getFullName() == null ||
                request.getFullName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Full name is required"
            );
        }

        if (request.getEmail() == null ||
                request.getEmail().trim().isEmpty()) {

            throw new RuntimeException(
                    "Email is required"
            );
        }

        admin.setFullName(
                request.getFullName().trim()
        );

        admin.setEmail(
                request.getEmail().trim()
        );

        admin.setPhone(
                request.getPhone()
        );

        adminRepository.save(admin);

        return createResponse(
                admin,
                null
        );
    }

    public void changePassword(
            String token,
            ChangePasswordRequest request
    ) {

        Admin admin =
                getAdminByToken(token);

        if (!PasswordUtil.matches(
                request.getCurrentPassword(),
                admin.getPassword()
        )) {

            throw new RuntimeException(
                    "Current password is incorrect"
            );
        }

        if (request.getNewPassword() == null ||
                request.getNewPassword().length() < 6) {

            throw new RuntimeException(
                    "New password must contain at least 6 characters"
            );
        }

        admin.setPassword(
                PasswordUtil.hash(
                        request.getNewPassword()
                )
        );

        adminRepository.save(admin);
    }

    private LoginResponse createResponse(
            Admin admin,
            String token
    ) {

        return new LoginResponse(
                token,
                admin.getId(),
                admin.getFullName(),
                admin.getUsername(),
                admin.getEmail(),
                admin.getPhone(),
                admin.getRole()
        );
    }
}