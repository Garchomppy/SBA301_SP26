package ncp.pe_sba301_sp25_be_de190224.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String emailAddress;
    private String memberPassword;
}
