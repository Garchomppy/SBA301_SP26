package ncp.pe_sba301_sp25_be_de190224.repositories;

import ncp.pe_sba301_sp25_be_de190224.pojos.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
}
