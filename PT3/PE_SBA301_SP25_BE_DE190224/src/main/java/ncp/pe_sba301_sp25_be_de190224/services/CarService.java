package ncp.pe_sba301_sp25_be_de190224.services;

import lombok.RequiredArgsConstructor;
import ncp.pe_sba301_sp25_be_de190224.pojos.Car;
import ncp.pe_sba301_sp25_be_de190224.repositories.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService implements ICarService {

    private final CarRepository carRepository;

    @Override
    public List<Car> getAllCars() {
        return carRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return carRepository.existsById(id);
    }

    @Override
    public Car updateCar(Long id, Car car) {
        if (carRepository.existsById(id)) {
            car.setCarId(id);
            return carRepository.save(car);
        }
        return null;
    }
}
