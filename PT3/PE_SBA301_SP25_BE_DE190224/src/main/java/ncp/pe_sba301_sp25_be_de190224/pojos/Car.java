package ncp.pe_sba301_sp25_be_de190224.pojos;

import jakarta.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    @jakarta.validation.constraints.NotBlank
    @jakarta.validation.constraints.Size(min = 11)
    private String carName;

    @jakarta.validation.constraints.Min(5)
    @jakarta.validation.constraints.Max(20)
    private Integer unitsInStock;

    @jakarta.validation.constraints.NotNull
    private Double unitPrice;

    private java.time.LocalDateTime createdAt;
    private java.time.LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "CountryID")
    private Country country;
}