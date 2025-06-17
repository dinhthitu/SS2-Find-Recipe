import axios from "axios";
import {
  getUserApi,
  getAllUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  getUserRecipesApi,
  deleteUserRecipeApi,
  deleteUserRecipe
} from "../../../Axios/client/api";

export const loadUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const data = await getUserApi();
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
    await axios.post('/api/users/logout', {}, { withCredentials: true });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error?.response?.data?.message || "Error in axios",
    });
  }
};

export const loadAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadAllUsersRequest" });
    const data = await getAllUsersApi();
    if (data.success) {
      dispatch({ type: "LoadAllUsersSuccess", payload: data.users });
    } else {
      dispatch({ type: "LoadAllUsersFail", payload: data.message });
    }
  } catch (error) {
    dispatch({
      type: "LoadAllUsersFail",
      payload: error?.response?.data?.message || "Error in axios",
    });
  }
};

export const createUserAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "CreateUserRequest" });
    const data = await createUserApi(userData);
    if (data.success) {
      dispatch({ type: "CreateUserSuccess", payload: data.user });
    } else {
      dispatch({ type: "CreateUserFail", payload: data.message });
    }
    return data;
  } catch (error) {
    dispatch({
      type: "CreateUserFail",
      payload: error?.response?.data?.message || "Error in axios",
    });
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

export const updateUserAction = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateUserRequest" });
    const data = await updateUserApi(id, userData);
    if (data.success) {
      dispatch({ type: "UpdateUserSuccess", payload: data.user });
    } else {
      dispatch({ type: "UpdateUserFail", payload: data.message });
    }
    return data;
  } catch (error) {
    dispatch({
      type: "UpdateUserFail",
      payload: error?.response?.data?.message || "Error in axios",
    });
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteUserRequest" });
    const data = await deleteUserApi(id);
    if (data.success) {
      dispatch({ type: "DeleteUserSuccess", payload: id });
    } else {
      dispatch({ type: "DeleteUserFail", payload: data.message });
    }
    return data;
  } catch (error) {
    dispatch({
      type: "DeleteUserFail",
      payload: error?.response?.data?.message || "Error in axios",
    });
    return {
      success: false,
      message: error?.response?.data?.message || "Error in axios",
    };
  }
};

export const loadUserRecipesAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRecipesRequest" });
    const data = await getUserRecipesApi(userId);
    if (data.success) {
      dispatch({ type: "LoadUserRecipesSuccess", payload: { userId, recipes: data.recipes } });
    } else {
      dispatch({ type: "LoadUserRecipesFail", payload: data.message });
    }
  } catch (error) {
    dispatch({
      type: "LoadUserRecipesFail",
      payload: error?.response?.data?.message || "Error in axios",
    });
  }
};

export const deleteUserRecipeAction = (userId, recipeId) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteUserRecipeRequest" });
    const data = await deleteUserRecipeApi(userId, recipeId);
    if (data.success) {
      dispatch({
        type: "DeleteUserRecipeSuccess",
        payload: { userId, recipeId },
      });
    } else {
      dispatch({ type: "DeleteUserRecipeFail", payload: data.message });
    }
  } catch (error) {
    dispatch({
      type: "DeleteUserRecipeFail",
      payload: error?.response?.data?.message || "Error in axios",
    });
  }
};

export const deleteRecipeAction = (recipeId) => async(dispatch) =>{
  try{
    dispatch({type: "DeleteRecipeRequest"});
    const data = await deleteUserRecipe(recipeId);
    if(data.success){
      dispatch({
        type: "DeleteRecipeSuccess",
        payload : {recipeId},
      });
    }else {
      dispatch({ type: "DeleteRecipeFail", payload: data.message });
    }
  }catch (error) {
    dispatch({
      type: "DeleteUserRecipeFail",
      payload: error?.response?.data?.message || "Error in axios",
    });
  }
}

