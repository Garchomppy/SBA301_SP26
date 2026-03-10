package ncp.pe_sba301_sp25_be_de190224.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ncp.pe_sba301_sp25_be_de190224.pojos.Car;
import ncp.pe_sba301_sp25_be_de190224.services.ICarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cars")
@RequiredArgsConstructor
public class CarController {

    private final ICarService carService;

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    @PostMapping
    public ResponseEntity<Car> addCar(@Valid @RequestBody Car car) {
        if (car.getCreatedAt() == null) {
            car.setCreatedAt(LocalDateTime.now());
        }
        if (car.getUpdatedAt() == null) {
            car.setUpdatedAt(car.getCreatedAt());
        }

        // Requirement: CreatedAt <= UpdatedAt
        if (car.getCreatedAt().isAfter(car.getUpdatedAt())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Car savedCar = carService.addCar(car);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCar);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        if (!carService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @Valid @RequestBody Car car) {
        if (!carService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        car.setUpdatedAt(LocalDateTime.now());
        Car updated = carService.updateCar(id, car);
        return ResponseEntity.ok(updated);
    }
}
