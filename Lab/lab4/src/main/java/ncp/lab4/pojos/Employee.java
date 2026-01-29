package ncp.lab4.pojos;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    @Id
    private String empId;
    @Id
    private String name;
    @Id
    private String designation;
    @Id
    private double salary;
}