package ncp.lab6.services;

import ncp.lab6.pojos.User;
import java.util.Map;

public interface IUserService {
    String register(User user);
    Map<String, String> login(Map<String, String> credentials);
}
