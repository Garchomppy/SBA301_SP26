package ncp.pe_sba301_sp25_be_de190224.controllers;

import lombok.RequiredArgsConstructor;
import ncp.pe_sba301_sp25_be_de190224.pojos.Country;
import ncp.pe_sba301_sp25_be_de190224.repositories.CountryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/countries")
@RequiredArgsConstructor
public class CountryController {

    private final CountryRepository countryRepository;

    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryRepository.findAll());
    }
}
