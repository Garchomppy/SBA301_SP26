import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const HomePage = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Navigation />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Chào mừng đến với FU MiniHotel System</h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
          Hệ thống đặt phòng khách sạn trực tuyến
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>📅 Đặt phòng</h3>
            <p>Tìm và đặt phòng theo yêu cầu của bạn</p>
            <button
              onClick={() => navigate('/bookings/create')}
              style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Đặt phòng ngay
            </button>
          </div>

          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>📋 Lịch sử</h3>
            <p>Xem lịch sử các lần đặt phòng của bạn</p>
            <button
              onClick={() => navigate('/bookings/history')}
              style={{ padding: '10px 20px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Xem lịch sử
            </button>
          </div>

          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>👤 Hồ sơ</h3>
            <p>Quản lý thông tin cá nhân của bạn</p>
            <button
              onClick={() => navigate('/profile')}
              style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Quản lý hồ sơ
            </button>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Thông tin hữu ích</h3>
          <ul style={{ color: '#666' }}>
            <li>Đặt phòng dễ dàng chỉ trong vài bước</li>
            <li>Nhận xác nhận tức thời sau khi đặt</li>
            <li>Quản lý tất cả đặt phòng từ một nơi</li>
            <li>Hỗ trợ khách hàng 24/7</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;