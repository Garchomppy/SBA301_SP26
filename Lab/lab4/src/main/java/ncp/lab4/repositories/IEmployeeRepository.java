package ncp.lab4.repositories;

import ncp.lab4.pojos.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;
import java.util.List;

public interface IEmployeeRepository extends PagingAndSortingRepository<Employee, String> {
    public List<Employee> getAllEmployees();

    public Employee getEmployeeId(String id);

    public Employee create(Employee user);

    public Employee delete(String id);
}
