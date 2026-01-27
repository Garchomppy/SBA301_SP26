package ncp.lab4.repositories;

import ncp.lab4.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class EmployeeRepository implements IEmployeeRepository {

    private List<Employee> employees = createList();

    private static List<Employee> createList() {
        List<Employee> tempEmployees = new ArrayList<>();
        Collections.addAll(tempEmployees, new Employee("EMP001", "John Doe", "Software Engineer", 60000), new Employee("EMP002", "Jane Smith", "Senior Software Engineer", 80000), new Employee("EMP003", "Alice Johnson", "Project Manager", 90000), new Employee("EMP004", "Bob Brown", "QA Engineer", 55000));
        return tempEmployees;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employees;
    }

    @Override
    public Employee getEmployeeId(String id) {
        Employee tmpEmployee = null;
        for (Employee emp : employees) {
            if (emp.getEmpId().equals(id)) {
                tmpEmployee = emp;
                break;
            }
        }
        return tmpEmployee;
    }

    @Override
    public Employee create(Employee user) {
        employees.add(user);
        System.out.println(employees);
        return user;
    }

    @Override
    public Employee delete(String id) {
        Employee deletedEmployee = null;
        for (Employee emp : employees) {
            if (emp.getEmpId().equals(id)) {
                deletedEmployee = emp;
                employees.remove(emp);
                break;
            }
        }
        return deletedEmployee;
    }

    @Override
    public Iterable<Employee> findAll(Sort sort) {
        return employees;
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        List<Employee> allEmployees = createList();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allEmployees.size());
        List<Employee> pageContent = allEmployees.subList(start, end);
        return new PageImpl<>(pageContent, pageable, allEmployees.size());
    }
}
