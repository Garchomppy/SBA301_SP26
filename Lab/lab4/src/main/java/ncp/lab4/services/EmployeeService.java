package ncp.lab4.services;

import ncp.lab4.pojos.Employee;
import ncp.lab4.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Page<Employee> getAllEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }

    @Override
    public Employee getEmployeeId(String id) {
        return employeeRepository.getEmployeeId(id);
    }

    @Override
    public Employee create(Employee user) {
        return employeeRepository.create(user);
    }

    @Override
    public Employee delete(String id) {
        return employeeRepository.delete(id);
    }
}
