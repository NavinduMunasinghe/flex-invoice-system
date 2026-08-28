package backend.config;

import backend.entity.Admin;
import backend.repository.AdminRepository;
import backend.util.PasswordUtil;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createDefaultAdmin(
            AdminRepository adminRepository
    ) {

        return args -> {

            if (!adminRepository
                    .existsByUsername("admin")) {

                Admin admin = new Admin();

                admin.setFullName(
                        "System Administrator"
                );

                admin.setUsername(
                        "admin"
                );

                admin.setEmail(
                        "admin@flexmobile.lk"
                );

                admin.setPhone(
                        ""
                );

                admin.setPassword(
                        PasswordUtil.hash(
                                "Admin@123"
                        )
                );

                admin.setRole(
                        "ADMIN"
                );

                adminRepository.save(admin);

                System.out.println(
                        "======================================"
                );

                System.out.println(
                        " FLEX MOBILE DEFAULT ADMIN CREATED"
                );

                System.out.println(
                        " Username : admin"
                );

                System.out.println(
                        " Password : Admin@123"
                );

                System.out.println(
                        "======================================"
                );
            }
        };
    }
}