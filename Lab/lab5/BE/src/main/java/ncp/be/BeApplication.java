package ncp.be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan({"ncp.be.controllers", "ncp.be.services", "ncp.be.repositories"})
@EnableJpaRepositories(basePackages = "ncp.be.repositories")
@EntityScan(basePackages = "ncp.be.pojos")
@SpringBootApplication
public class BeApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeApplication.class, args);
    }

}
