package ncp.pe_sba301_sp25_be_de190224.services;

import ncp.pe_sba301_sp25_be_de190224.pojos.AccountMember;
import java.util.Optional;

public interface IAccountMemberService {
    Optional<AccountMember> findByEmail(String email);

    AccountMember register(AccountMember member);
}
