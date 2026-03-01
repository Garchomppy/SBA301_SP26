import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation errors state
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'Email không được để trống';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Email không hợp lệ';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Mật khẩu không được để trống';
    }
    if (value.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return '';
  };

  const validateFullName = (value) => {
    if (!value.trim()) {
      return 'Họ và tên không được để trống';
    }
    if (value.trim().length < 3) {
      return 'Họ và tên phải có ít nhất 3 ký tự';
    }
    return '';
  };

  const validateConfirmPassword = (pwd, cfmPwd) => {
    if (!cfmPwd) {
      return 'Vui lòng xác nhận mật khẩu';
    }
    if (pwd !== cfmPwd) {
      return 'Mật khẩu không khớp';
    }
    return '';
  };

  // Handle input change with real-time validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({
      ...errors,
      email: validateEmail(value),
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({
      ...errors,
      password: validatePassword(value),
      confirmPassword: confirmPassword ? validateConfirmPassword(value, confirmPassword) : '',
    });
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    setErrors({
      ...errors,
      fullName: validateFullName(value),
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors({
      ...errors,
      confirmPassword: validateConfirmPassword(password, value),
    });
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      !errors.email &&
      !errors.password &&
      !errors.fullName &&
      !errors.confirmPassword &&
      email &&
      password &&
      fullName &&
      confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Final validation
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const fullNameError = validateFullName(fullName);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    if (emailError || passwordError || fullNameError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        fullName: fullNameError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    setLoading(true);

    const result = await register(email, password, fullName);

    setLoading(false);

    if (result.success) {
      setSuccess(result.message || 'Đăng ký thành công!');
      // Clear form
      setEmail('');
      setPassword('');
      setFullName('');
      setConfirmPassword('');
      setErrors({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: '',
      });
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.message || 'Đăng ký thất bại');
    }
  };

  const inputStyle = (fieldError) => ({
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    boxSizing: 'border-box',
    border: fieldError ? '2px solid #dc3545' : '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: fieldError ? '#fff5f5' : '#fff',
  });

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Đăng ký tài khoản</h2>
      {error && <p style={{ color: '#dc3545', margin: '10px 0' }}>{error}</p>}
      {success && <p style={{ color: '#28a745', margin: '10px 0' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ và tên:</label><br />
          <input
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            style={inputStyle(errors.fullName)}
            placeholder="Nhập họ và tên"
          />
          {errors.fullName && <p style={{ color: '#dc3545', fontSize: '12px', margin: '4px 0' }}>{errors.fullName}</p>}
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={inputStyle(errors.email)}
            placeholder="Nhập email"
          />
          {errors.email && <p style={{ color: '#dc3545', fontSize: '12px', margin: '4px 0' }}>{errors.email}</p>}
        </div>

        <div>
          <label>Mật khẩu:</label><br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={inputStyle(errors.password)}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
          />
          {errors.password && <p style={{ color: '#dc3545', fontSize: '12px', margin: '4px 0' }}>{errors.password}</p>}
        </div>

        <div>
          <label>Xác nhận mật khẩu:</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={inputStyle(errors.confirmPassword)}
            placeholder="Nhập lại mật khẩu"
          />
          {errors.confirmPassword && <p style={{ color: '#dc3545', fontSize: '12px', margin: '4px 0' }}>{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={loading || !isFormValid()}
          style={{
            padding: '10px 20px',
            background: isFormValid() && !loading ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isFormValid() && !loading ? 'pointer' : 'not-allowed',
            width: '100%',
            marginTop: '10px',
          }}
        >
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Đã có tài khoản? <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Đăng nhập</a>
      </p>
    </div>
  );
};

export default RegisterForm;
