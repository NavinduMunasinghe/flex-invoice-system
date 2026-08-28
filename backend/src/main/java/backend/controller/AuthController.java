package backend.controller;

import backend.dto.AdminProfileRequest;
import backend.dto.ChangePasswordRequest;
import backend.dto.LoginRequest;
import backend.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        try {

            return ResponseEntity.ok(
                    authService.login(request)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(401)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest request
    ) {

        String token =
                extractToken(request);

        authService.logout(token);

        return ResponseEntity.ok(
                "Logged out successfully"
        );
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            HttpServletRequest request
    ) {

        return ResponseEntity.ok(
                authService.getProfile(
                        extractToken(request)
                )
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            HttpServletRequest request,
            @RequestBody AdminProfileRequest body
    ) {

        return ResponseEntity.ok(
                authService.updateProfile(
                        extractToken(request),
                        body
                )
        );
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(
            HttpServletRequest request,
            @RequestBody ChangePasswordRequest body
    ) {

        authService.changePassword(
                extractToken(request),
                body
        );

        return ResponseEntity.ok(
                "Password changed successfully"
        );
    }

    private String extractToken(
            HttpServletRequest request
    ) {

        String header =
                request.getHeader("Authorization");

        if (header == null ||
                !header.startsWith("Bearer ")) {

            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        return header.substring(7);
    }
}