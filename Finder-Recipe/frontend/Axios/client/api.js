import axios from "../axios.custom"
const registerUser = async(data)=>{
    try {
        const URL_LOGIN ='/users/register'
        const response = await axios.post(URL_LOGIN, data, {
            withCredentials: true,  // Đảm bảo gửi cookie
        });
        console.log(response.data);
        return response
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error?.response?.data?.message || "Error in axios"
            
        }
    }
}
const checkTokenOtp = async(data)=>{
    try {
        const URL_LOGIN ='/users/checkOtp'
        const response = await axios.post(URL_LOGIN, data,
            {withCredentials:true
            })
        return response
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error?.response?.data?.message || "Error in axios"
            
        }
    }
}
const getUserApi =async ()=>{
    try {
        const URL_LOGIN ='/users/getuser'
        const response = await axios.get(URL_LOGIN,{withCredentials:true})
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const loginApi = async(data)=>{
    try {
        const URL_LOGIN ='/users/login'
        const response = await axios.post(URL_LOGIN,data,{withCredentials:true})

        return response
        
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
export {
    registerUser,
    checkTokenOtp,
    getUserApi,
    loginApi }