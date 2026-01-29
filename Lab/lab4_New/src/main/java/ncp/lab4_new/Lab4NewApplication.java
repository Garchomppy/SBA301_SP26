package ncp.lab4_new;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"ncp.lab4_new.controllers", "ncp.lab4_new.services", "ncp.lab4_new.repositories"})
@EnableJpaRepositories(basePackages = "ncp.lab4_new.repositories")
@EntityScan(basePackages = "ncp.lab4_new.pojos")
public class Lab4NewApplication {

    public static void main(String[] args) {
        SpringApplication.run(Lab4NewApplication.class, args);
    }

}
