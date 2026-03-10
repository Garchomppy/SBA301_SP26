package ncp.pe_sba301_sp25_be_de190224.repositories;

import ncp.pe_sba301_sp25_be_de190224.pojos.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findAllByOrderByCreatedAtDesc();
}
