import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import api from '../../stores/api';

const BookingCreatePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedRoomIds, setSelectedRoomIds] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  if (!token) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    fetchAvailableRooms();
  }, []);

  const fetchAvailableRooms = async () => {
    try {
      setLoading(true);
      const res = await api.get('/rooms');
      setRooms(res.data || []);
      setError('');
    } catch (err) {
      setError('Lỗi tải danh sách phòng: ' + (err.response?.data?.error || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomToggle = (roomId) => {
    setSelectedRoomIds((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (selectedRoomIds.length === 0) {
      setError('Vui lòng chọn ít nhất 1 phòng');
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setError('Vui lòng chọn ngày check-in và check-out');
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setError('Ngày check-out phải sau ngày check-in');
      return;
    }

    try {
      setSubmitting(true);
      const bookingRequest = {
        roomIds: selectedRoomIds,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      };

      const res = await api.post('/bookings', bookingRequest);
      setMessage('Đặt phòng thành công! Chuyển hướng...');
      setSelectedRoomIds([]);
      setCheckInDate('');
      setCheckOutDate('');

      setTimeout(() => {
        navigate('/bookings/history');
      }, 2000);
    } catch (err) {
      setError('Lỗi đặt phòng: ' + (err.response?.data?.error || err.message));
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải...</div>;
  }

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px' }}>
      <h1>Đặt phòng</h1>

      {error && <div style={{ color: '#dc3545', marginBottom: '15px', padding: '10px', background: '#fff5f5', borderRadius: '4px' }}>{error}</div>}
      {message && <div style={{ color: '#28a745', marginBottom: '15px', padding: '10px', background: '#f0f9ff', borderRadius: '4px' }}>{message}</div>}

      <form onSubmit={handleSubmitBooking}>
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Thời gian</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label>
                <strong>Ngày check-in:</strong>
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
            <div>
              <label>
                <strong>Ngày check-out:</strong>
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Chọn phòng</h3>

          {rooms.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <p>Hiện không có phòng khả dụng</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
              {rooms.map((room) => (
                <div
                  key={room.id}
                  style={{
                    border: selectedRoomIds.includes(room.id) ? '2px solid #007bff' : '1px solid #ddd',
                    padding: '15px',
                    borderRadius: '8px',
                    cursor: room.status === 'AVAILABLE' ? 'pointer' : 'not-allowed',
                    opacity: room.status === 'AVAILABLE' ? 1 : 0.5,
                    background: selectedRoomIds.includes(room.id) ? '#e7f3ff' : 'white',
                  }}
                  onClick={() => room.status === 'AVAILABLE' && handleRoomToggle(room.id)}
                >
                  <div style={{ marginBottom: '10px' }}>
                    <input
                      type="checkbox"
                      checked={selectedRoomIds.includes(room.id)}
                      onChange={() => room.status === 'AVAILABLE' && handleRoomToggle(room.id)}
                      disabled={room.status !== 'AVAILABLE'}
                      style={{ marginRight: '8px' }}
                    />
                    <strong>Phòng {room.roomNumber}</strong>
                  </div>

                  <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                    <strong>{room.roomTypeName || room.roomType?.description}</strong>
                  </div>

                  <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                    Giá: <strong>{parseFloat(room.pricePerNight || room.roomType?.pricePerNight || 0).toLocaleString('vi-VN')} VNĐ</strong>/đêm
                  </div>

                  <div style={{ fontSize: '12px', color: room.status === 'AVAILABLE' ? '#28a745' : '#dc3545' }}>
                    {room.status === 'AVAILABLE' ? '✓ Còn phòng' : '✗ Hết phòng'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong>Số phòng được chọn: {selectedRoomIds.length}</strong>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              flex: 1,
              padding: '12px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? 'Đang đặt...' : 'Đặt phòng'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/home')}
            style={{
              flex: 1,
              padding: '12px',
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
        </div>
    </>
  );
};

export default BookingCreatePage;
