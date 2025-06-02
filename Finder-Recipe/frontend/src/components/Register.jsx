import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import {Form, Input} from "antd"
import {RxAvatar} from "react-icons/rx"
import { Link, useLocation, useNavigate } from 'react-router'
import { registerUser } from '../../Axios/client/api'
import toast from 'react-hot-toast'

const Register = ({otp,setOtp}) => {
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3001/api/auth/login";
    };
    const navigate = useNavigate();  // Để điều hướng trang
    const location = useLocation();  // Để lấy đường dẫn hiện tại khi thay đổi route
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    useEffect(() => {
        window.scrollTo({top:0,behavior:"smooth"});  // Cuộn trang lên đầu khi route thay đổi
          // Cuộn trang lên đầu khi route thay đổi
    }, [location]);
    const [form] = Form.useForm()
    const [avatar,setAvatar] = useState(null)
    const [buttonDisable,setButtonDisable] = useState(false)


    const hanldeFinish = async(e)=>{
      
        setButtonDisable(true)

        
        const newForm = new FormData();
        if(avatar){
            newForm.append("file",avatar)
         
        }
       
        if(!e.email){
            setButtonDisable(false)
            return toast.error("Email is required!", {
                style: {
                  maxWidth: 500
                },
                duration:3000
              });
        }
        if(!e.username){
            setButtonDisable(false)
            return toast.error("User name is required!", {
                style: {
                  maxWidth: 500
                },
                duration:3000
              });
        }
        if(!isValidEmail(e.email)){
            setButtonDisable(false)
            return toast.error("Please enter a valid email address!", {
                style: {
                  maxWidth: 500
                },
                duration:3000
              });
        }
        
        if(!e.password){
            setButtonDisable(false)
            return toast.error("Password is required!", {
                style: {
                  maxWidth: 500
                },
                duration:3000
              });
        }
        if(!e.confirmPassword){
            setButtonDisable(false)
            return toast.error("Confirm password is required!", {
                style: {
                  maxWidth: 500
                },
                duration:3000
              });
        }
        newForm.append("username",e.username)
        newForm.append("email",e.email)
        newForm.append("password",e.password)
        newForm.append("confirmPassword",e.confirmPassword)
        if(e.password !== e.confirmPassword){
            setButtonDisable(false)
            return toast.error("Passwords do not match. Please try again.", {
                style: {
                  maxWidth: 500
                },
                duration:3000
              });
        }
        const res = await registerUser(newForm)
    

        if(res.success){
            // toast.success(res.message);
            setButtonDisable(false)  

            setOtp(res.token)

            navigate(`/confirmOtp`)
        }
        else{
            toast.error(res.message, {
                style: {
                  maxWidth: 500
                },
                duration:3000
              });
            setButtonDisable(false)
        }
        setButtonDisable(false)

        form.resetFields()
        setAvatar(null)

    }
    const handleFileInputChange = (e)=>{
        const file = e.target.files[0]
        setAvatar(file)
    }


  return (
    <>
        
        <div className='w-full mt-[5%]'>
            <div className={"w-[50%] shadow-xl rounded-lg mb-[30px] py-3 mx-auto"}>
                <div className='flex flex-col items-center gap-4'>
                    <h2 className='font-[600] text-[48px] leading-[48px]'>Sign up</h2>
                    <p className='font-[400] text-[14px] leading-[20px] text-[#6B7280]'>Welcome to our blog magazine Community</p>
                </div>
                <br />
                <br />
                <div className='w-[60%]  mx-auto'>
                     <div onClick={handleGoogleLogin} className={" cursor-pointer px-6 flex items-center rounded-[16px] py-3 bg-[#F3F4F6] w-full"}>
                        <FcGoogle

                                size={20} />

                        <p className={"flex-1 flex items-center justify-center font-[500] text-[16px] leading-[24px] text-[#374151]"}>Continue with Google</p>
                    </div>
                 
                    <br />
                    
                    <Form form={form} onFinish={hanldeFinish} layout='vertical'>
                        <Form.Item  name="email"  label={<div className='font-[500] text-[14px] leading-[20px] text-[#374151]'>Email</div>}>
                            <Input
                                placeholder="you@example.com"
                                autoComplete="email"  
                                type='text'
                                className='text-[#6B7280] font-[400] text-[16px] leading-[24px] !rounded-2xl !py-2 !px-3'
                            />
                        </Form.Item>
                        <Form.Item  name="username"  label={<div className='font-[500] text-[14px] leading-[20px] text-[#374151]'>Username</div>}>
                            <Input
                                placeholder="username"
                                autoComplete="username"  
                                type='text'
                                className='text-[#6B7280] font-[400] text-[16px] leading-[24px] !rounded-2xl !py-2 !px-3'
                            />
                        </Form.Item>
                        <Form.Item  name="password"  label={<div className='font-[500] text-[14px] leading-[20px] text-[#374151]'>Password</div>}>
                            <Input.Password
                                placeholder="****"
                                type='text'
                                className='text-[#6B7280] font-[400] text-[16px] leading-[24px] !rounded-2xl !py-2 !px-3'
                            />
                        </Form.Item>
                        <Form.Item  name="confirmPassword"  label={<div className='font-[500] text-[14px] leading-[20px] text-[#374151]'>Confirm Password</div>}>
                            <Input.Password
                                placeholder="****"
                                type='text'
                                className='text-[#6B7280] font-[400] text-[16px] leading-[24px] !rounded-2xl !py-2 !px-3'
                            />
                        </Form.Item>
                        <Form.Item
                            label={
                                <div className='font-[500] text-[14px] leading-[20px] text-[#374151]'>
                                Upload Avatar
                                </div>
                            }
                            >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100"
                            />
                        </Form.Item>

                        <Form.Item  >
                            <button disabled={buttonDisable} className={' cursor-pointer w-full bg-[#4F46E5] rounded-4xl py-3 flex items-center justify-center text-white font-[500] text-[16px] leading-[24px] ' + (!buttonDisable?"cursor-pointer ":"cursor-progress  opacity-70")}>Continute</button>
   
                        </Form.Item>
                        <div className={"w-full text-center mt-[10px] mb-[30px]"}>
                            <p  className={"font-[400] text-[16px] leading-[24px]"}>Have an account? <Link to={"/login"} className={"text-[#3730A3]"}>Sign In</Link></p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register