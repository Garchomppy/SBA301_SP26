package ncp.lab4_new.repositories;

import ncp.lab4_new.pojos.Orchids;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrchidRepository extends JpaRepository<Orchids, Integer> {
}
