import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Thêm để gửi cookie nếu cần
});

// Interceptor để xử lý request trước khi gửi
// api.interceptors.request.use(
//   (config) => {
//     // let token = localStorage.getItem('token');
//     // if (!token) {
//     //   token = document.cookie
//     //     .split('; ')
//     //     .find(row => row.startsWith('token='))
//     //     ?.split('=')[1];
//     //   console.log('Token from cookie:', token);
//     //   if (token) {
//     //     localStorage.setItem('token', token);
//     //   }
//     // }
//     // console.log('Token being sent in header:', token);
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// Update your api.js file
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (!token) {
      token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (token) {
        localStorage.setItem("token", token);
      }
    }
    console.log("Token being sent in header:", token);
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
      console.error('Unauthorized - Redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
    }
    if (error.response) {
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);
export const getUserApi = async () => {
  try {
    const response = await api.get('/users/getuser');
    return response;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error fetching user" };
  }
};
export const deleteUserRecipeApi = async (userId, recipeId) => {
  try {
    const response = await api.delete(`/wishlist/admin/${userId}/${recipeId}`);
    return response;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message
    };
  }
};

export default api;
