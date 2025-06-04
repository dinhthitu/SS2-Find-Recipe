import { getUserApi } from "../../../Axios/client/api"

export const loadUserAction = () => async (dispatch) => {
    try {
      dispatch({ type: "LoadUserRequest" });
      const data = await getUserApi();
      console.log("getUserApi response:", data);
      if (data.success) {
        dispatch({ type: "LoadUserSuccess", payload: data.user });
        if (!localStorage.getItem('token')) {
          const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
          if (token) localStorage.setItem('token', token);
        }
      } else {
        dispatch({ type: "LoadUserFail", payload: "Login to continue" });
      }
    } catch (error) {
      dispatch({
        type: "LoadUserFail",
        payload: error?.response?.data?.message || "Error in axios",
      });
    }
  };


export const loginUserAction = (data) => async (dispatch) => {
    try {
       

        dispatch({
            type: "LoadUserSuccess",
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error?.response?.data?.message || "Error in axios",
        });
    }
};

export const logoutUserAction = () => async (dispatch) => {
    try {
      await axios.post('/api/users/logout'); // Gọi API logout
      localStorage.removeItem('token'); // Xóa token trong localStorage
      localStorage.removeItem('user'); // Xóa user trong localStorage
      sessionStorage.clear();
  
      dispatch({
        type: "LogoutUserSuccess"
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFail",
        payload: error?.response?.data?.message || "Error in axios",
      });
    }
  };