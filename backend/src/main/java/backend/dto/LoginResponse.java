package backend.dto;

public class LoginResponse {

    private String token;
    private Long id;
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private String role;

    public LoginResponse(
            String token,
            Long id,
            String fullName,
            String username,
            String email,
            String phone,
            String role
    ) {
        this.token = token;
        this.id = id;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getRole() {
        return role;
    }
}