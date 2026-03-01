import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import api from '../../stores/api';

const ProfilePage = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    phone: '',
    birthday: '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  if (!token) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/profile');
      setProfile(res.data);
      setEditData({
        fullName: res.data.fullName || '',
        phone: res.data.phone || '',
        birthday: res.data.birthday || '',
      });
      setError('');
    } catch (err) {
      setError('Lỗi tải profile: ' + (err.response?.data?.error || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/profile', editData);
      setProfile(res.data.user);
      setIsEditing(false);
      setMessage('Cập nhật profile thành công!');
      setTimeout(() => setMessage(''), 3000);
      setError('');
    } catch (err) {
      setError('Lỗi cập nhật: ' + (err.response?.data?.error || err.message));
      console.error(err);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('Mật khẩu xác nhận không khớp');
        return;
      }

      const res = await api.post('/profile/change-password', passwordData);
      setShowChangePassword(false);
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setMessage('Đổi mật khẩu thành công!');
      setTimeout(() => setMessage(''), 3000);
      setError('');
    } catch (err) {
      setError('Lỗi đổi mật khẩu: ' + (err.response?.data?.error || err.message));
      console.error(err);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải...</div>;
  }

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Thông tin cá nhân</h1>
        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Đăng xuất
        </button>
      </div>

      {error && <div style={{ color: '#dc3545', marginBottom: '15px', padding: '10px', background: '#fff5f5', borderRadius: '4px' }}>{error}</div>}
      {message && <div style={{ color: '#28a745', marginBottom: '15px', padding: '10px', background: '#f0f9ff', borderRadius: '4px' }}>{message}</div>}

      {!isEditing && !showChangePassword && profile && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <div style={{ marginBottom: '15px' }}>
            <strong>Email:</strong> {profile.email}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Họ và tên:</strong> {profile.fullName || 'Chưa cập nhật'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Số điện thoại:</strong> {profile.phone || 'Chưa cập nhật'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Ngày sinh:</strong> {profile.birthday || 'Chưa cập nhật'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Vai trò:</strong> {profile.role === 'CUSTOMER' ? 'Khách hàng' : 'Nhân viên'}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: '10px 20px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Chỉnh sửa thông tin
            </button>
            <button
              onClick={() => setShowChangePassword(true)}
              style={{
                padding: '10px 20px',
                background: '#ffc107',
                color: 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSaveProfile} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label>Họ và tên:</label>
            <input
              type="text"
              name="fullName"
              value={editData.fullName}
              onChange={handleEditChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={editData.phone}
              onChange={handleEditChange}
              placeholder="10 chữ số"
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Ngày sinh:</label>
            <input
              type="date"
              name="birthday"
              value={editData.birthday}
              onChange={handleEditChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '10px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{
                flex: 1,
                padding: '10px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      {showChangePassword && (
        <form onSubmit={handleChangePassword} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label>Mật khẩu cũ:</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Xác nhận mật khẩu mới:</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '10px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Đổi mật khẩu
            </button>
            <button
              type="button"
              onClick={() => setShowChangePassword(false)}
              style={{
                flex: 1,
                padding: '10px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
    </div>
    </>
    );
};

export default ProfilePage;
