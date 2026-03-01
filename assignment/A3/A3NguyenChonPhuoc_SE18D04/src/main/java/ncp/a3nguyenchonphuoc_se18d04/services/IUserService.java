package ncp.a3nguyenchonphuoc_se18d04.services;

import ncp.a3nguyenchonphuoc_se18d04.pojos.User;

import java.util.List;

public interface IUserService {

    User registerCustomer(User user);     // cho customer tự đăng ký

    User getUserById(Long id);

    User getUserByEmail(String email);

    List<User> getAllCustomers();         // chỉ staff mới gọi được

    User updateProfile(Long id, User updated);

}