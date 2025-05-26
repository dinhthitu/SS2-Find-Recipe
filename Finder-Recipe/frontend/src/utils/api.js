import axios from 'axios';
const handleAuthSuccess = async (user) => {
  try {
    const token = await user.getIdToken(true); // Làm mới token
    console.log('Token being sent to backend:', token);

    const response = await api.post('/auth/login', { token });

    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', token);

    console.log('Backend login successful:', response);
    navigate(response.user.role === 'admin' ? '/admin' : '/');
  } catch (error) {
    console.error('Backend login error:', error);
    setError(error.response?.data?.message || error.message || 'Server error');
  }
};
// Tạo instance Axios với cấu hình mặc định
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để xử lý request trước khi gửi
api.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const user = auth.currentUser;
        if (user) {
          const newToken = await user.getIdToken(true);
          localStorage.setItem('token', newToken);
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api.request(error.config); // Thử lại yêu cầu
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
      }
    }
    if (error.response) {
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);
export default api;
