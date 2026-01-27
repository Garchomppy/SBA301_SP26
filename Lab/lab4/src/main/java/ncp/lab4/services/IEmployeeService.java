package ncp.lab4.services;

import ncp.lab4.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface IEmployeeService {
    public Page<Employee> getAllEmployees(Pageable pageable);

    public Employee getEmployeeId(String id);

    public Employee create(Employee user);

    public Employee delete(String id);
}
