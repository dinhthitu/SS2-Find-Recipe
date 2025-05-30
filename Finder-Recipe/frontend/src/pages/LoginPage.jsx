import React, { useEffect } from 'react'
import Login from '../components/Login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const LoginPage = ({otp,setOtp}) => {
    const {isAuthenticated} = useSelector(state=>state.UserReducer)
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
        setOtp('')
    }
    , []);
    const check = ()=>{
        if(isAuthenticated){
            navigate("/")
        }
    }
    useEffect(()=>{check()},[])
 


    return (
        <>
            <div className={"relative min-h-screen"}>
              
                <Login/>

            </div>


        </>
    )
}
export default LoginPage