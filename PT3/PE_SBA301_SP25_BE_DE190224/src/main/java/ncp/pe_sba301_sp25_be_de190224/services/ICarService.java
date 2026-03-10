package ncp.pe_sba301_sp25_be_de190224.services;

import ncp.pe_sba301_sp25_be_de190224.pojos.Car;
import java.util.List;

public interface ICarService {
    List<Car> getAllCars();

    Car addCar(Car car);

    void deleteCar(Long id);

    boolean existsById(Long id);

    Car updateCar(Long id, Car car);
}
