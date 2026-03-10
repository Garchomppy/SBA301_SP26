package ncp.pe_sba301_sp25_be_de190224.pojos;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class AccountMember {
    @Id
    private String memberId;
    private String memberPassword;
    private String emailAddress;
    private Integer memberRole;
}
