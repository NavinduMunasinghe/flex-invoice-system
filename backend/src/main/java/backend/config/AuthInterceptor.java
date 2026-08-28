package backend.config;

import backend.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor
        implements HandlerInterceptor {

    private final AuthService authService;

    public AuthInterceptor(
            AuthService authService
    ) {
        this.authService = authService;
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {

        String path =
                request.getRequestURI();

        /*
         * Login is public.
         */
        if (path.equals(
                "/api/auth/login"
        )) {
            return true;
        }

        /*
         * CORS preflight.
         */
        if ("OPTIONS".equalsIgnoreCase(
                request.getMethod()
        )) {
            return true;
        }

        String header =
                request.getHeader(
                        "Authorization"
                );

        if (header == null ||
                !header.startsWith("Bearer ")) {

            response.setStatus(
                    HttpServletResponse
                            .SC_UNAUTHORIZED
            );

            return false;
        }

        String token =
                header.substring(7);

        try {

            authService.getAdminByToken(token);

            return true;

        } catch (Exception e) {

            response.setStatus(
                    HttpServletResponse
                            .SC_UNAUTHORIZED
            );

            return false;
        }
    }
}