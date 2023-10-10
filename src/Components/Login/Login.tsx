import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import jwtDecode  from 'jwt-decode'

const Login = () => {
    
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse); 
                const decodedJwt = jwtDecode(credentialResponse.credential!)
                console.log(decodedJwt)
                //decodedJwt.sub is the userID , send it to the backend
                //set state of loading and then have it laoding while we send it to the backend
                //then we get actual the id from the backend
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
  )
}

export default Login
