import { createContext, useState, useEffect, useContext } from 'react';
import api, { setupAxiosInterceptor } from '../stores/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra token khi app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUser({ isAuthenticated: true }); // sau này cải thiện bằng cách gọi API lấy profile
    }
    setLoading(false);
  }, []);

  // Set up axios interceptor whenever token changes
  useEffect(() => {
    setupAxiosInterceptor(token);
  }, [token]);

  const register = async (email, password, fullName) => {
    try {
      const res = await api.post('/auth/register', {
        email,
        password,
        fullName,
      });

      console.log('Register success:', res.data);
      return { success: true, message: res.data || 'Đăng ký thành công. Vui lòng đăng nhập!' };
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      return { success: false, message: err.response?.data || 'Đăng ký thất bại' };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      const { token } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser({ isAuthenticated: true });
      return { success: true, token };
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      return { success: false, message: err.response?.data || 'Đăng nhập thất bại' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);