package ncp.pe_sba301_sp25_be_de190224.services;

import lombok.RequiredArgsConstructor;
import ncp.pe_sba301_sp25_be_de190224.pojos.AccountMember;
import ncp.pe_sba301_sp25_be_de190224.repositories.AccountMemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountMemberService implements IAccountMemberService {

    private final AccountMemberRepository memberRepository;

    @Override
    public Optional<AccountMember> findByEmail(String email) {
        return memberRepository.findByEmailAddress(email);
    }

    @Override
    public AccountMember register(AccountMember member) {
        return memberRepository.save(member);
    }
}
