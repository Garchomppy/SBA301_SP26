package  ncp.be.services;

import ncp.be.pojos.Orchids;
import ncp.be.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository orchidRepository;

    @Override
    public List<Orchids> getAllOrchids() {
        return orchidRepository.findAll();
    }

    @Override
    public Orchids insertOrchids(Orchids Orchids) {
        return orchidRepository.save(Orchids);
    }

    @Override
    public Orchids updateOrchids(int orchidsID, Orchids orchids) {
        Orchids o = orchidRepository.getById(orchidsID);
        if (o != null) {
            o.setOrchidName(orchids.getOrchidName());
            o.setOrchidDescription(orchids.getOrchidDescription());
        }
        return orchidRepository.save(o);
    }

    @Override
    public void deleteOrchids(int OrchidsID) {
        orchidRepository.deleteById(OrchidsID);
    }

    @Override
    public Optional<Orchids> getOrchidsByID(int OrchidsID) {
        return orchidRepository.findById(OrchidsID);
    }
}
