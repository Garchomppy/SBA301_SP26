import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import api from '../../stores/api';

const CustomerManagementPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    status: 'ACTIVE',
  });

  if (!token) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/customers');
      setCustomers(res.data || []);
      setError('');
    } catch (err) {
      setError('Lỗi tải danh sách khách hàng: ' + (err.response?.data?.error || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update customer
        const { password, ...updateData } = formData;
        await api.put(`/customers/${editingId}`, updateData);
        setMessage('Cập nhật khách hàng thành công!');
      } else {
        // Create customer
        await api.post('/customers', formData);
        setMessage('Tạo khách hàng thành công!');
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        status: 'ACTIVE',
      });
      fetchCustomers();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Lỗi lưu dữ liệu: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      email: customer.email,
      password: '',
      fullName: customer.fullName || '',
      phone: customer.phone || '',
      status: customer.status || 'ACTIVE',
    });
    setEditingId(customer.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa khách hàng này?')) return;

    try {
      await api.delete(`/customers/${id}`);
      setMessage('Xóa khách hàng thành công!');
      fetchCustomers();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Lỗi xóa khách hàng: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      email: '',
      password: '',
      fullName: '',
      phone: '',
      status: 'ACTIVE',
    });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải...</div>;
  }

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Quản lý Khách hàng</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              + Thêm khách hàng
            </button>
          )}
        </div>

        {error && <div style={{ color: '#dc3545', marginBottom: '15px', padding: '10px', background: '#fff5f5', borderRadius: '4px' }}>{error}</div>}
        {message && <div style={{ color: '#28a745', marginBottom: '15px', padding: '10px', background: '#f0f9ff', borderRadius: '4px' }}>{message}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>{editingId ? 'Chỉnh sửa khách hàng' : 'Tạo khách hàng mới'}</h3>

            <div style={{ marginBottom: '15px' }}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={!!editingId}
                style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            {!editingId && (
              <div style={{ marginBottom: '15px' }}>
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <label>Họ và tên:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Trạng thái:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="ACTIVE">Hoạt động</option>
                <option value="INACTIVE">Không hoạt động</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{ flex: 1, padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                {editingId ? 'Cập nhật' : 'Tạo mới'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={{ flex: 1, padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Hủy
              </button>
            </div>
          </form>
        )}

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Họ tên</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Số ĐT</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Trạng thái</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    Không có khách hàng nào
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>{customer.email}</td>
                    <td style={{ padding: '12px' }}>{customer.fullName || '-'}</td>
                    <td style={{ padding: '12px' }}>{customer.phone || '-'}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', background: customer.status === 'ACTIVE' ? '#d4edda' : '#f8d7da', color: customer.status === 'ACTIVE' ? '#155724' : '#721c24' }}>
                        {customer.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleEdit(customer)}
                        style={{ padding: '5px 10px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerManagementPage;
