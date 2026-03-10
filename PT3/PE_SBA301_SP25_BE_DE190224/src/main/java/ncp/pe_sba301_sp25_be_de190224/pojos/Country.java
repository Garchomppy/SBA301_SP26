package ncp.pe_sba301_sp25_be_de190224.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long countryId;
    private String countryName;

    @OneToMany(mappedBy = "country")
    @JsonIgnore
    private List<Car> cars;
}