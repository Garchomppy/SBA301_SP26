package  ncp.be.repositories;

import ncp.be.pojos.Orchids;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrchidRepository extends JpaRepository<Orchids, Integer> {
}
