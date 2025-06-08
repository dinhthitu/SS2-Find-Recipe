import axios from "../axios.custom";

const registerUser = async (data) => {
  try {
    const URL_LOGIN = '/users/register';
    const response = await axios.post(URL_LOGIN, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

const checkTokenOtp = async (data) => {
  try {
    const URL_LOGIN = '/users/checkOtp';
    const response = await axios.post(URL_LOGIN, data, { withCredentials: true });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

const getUserApi = async () => {
  try {
    const URL_LOGIN = '/users/getuser';
    const response = await axios.get(URL_LOGIN, { withCredentials: true });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

const loginApi = async (data) => {
  try {
    const URL_LOGIN = '/users/login';
    const response = await axios.post(URL_LOGIN, data, { withCredentials: true });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

const getAllUsersApi = async () => {
  try {
    const URL = '/admin/users';
    const response = await axios.get(URL, { withCredentials: true });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

const createUserApi = async (data) => {
  try {
    const URL = '/users/create';
    const response = await axios.post(URL, data, { withCredentials: true });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

const updateUserApi = async (id, data) => {
  try {
    const URL = `/admin/users/${id}`;
    const response = await axios.put(URL, data, { withCredentials: true });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

const deleteUserApi = async (id) => {
  try {
    const URL = `/admin/users/${id}`;
    const response = await axios.delete(URL, { withCredentials: true });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

const getUserRecipesApi = async (userId) => {
  try {
    const URL = `/admin/users/${userId}/recipes`;
    const response = await axios.get(URL, { withCredentials: true });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};
export {
  registerUser,
  checkTokenOtp,
  getUserApi,
  loginApi,
  getAllUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  getUserRecipesApi,
  
};
