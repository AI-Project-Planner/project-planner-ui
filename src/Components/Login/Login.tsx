import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import jwtDecode  from 'jwt-decode'

const Login = ({ setAppError }: { setAppError: React.Dispatch<React.SetStateAction<Error | null>> }) => {
    
    return (
        <GoogleLogin
            shape='pill'
            size='large'
            onSuccess={credentialResponse => {
                console.log(credentialResponse); 
                const decodedJwt = jwtDecode(credentialResponse.credential!)
                console.log(decodedJwt)
                //decodedJwt.sub is the userID , send it to the backend
                // --> object to send to BE 
                    // {
                    //   "name": decodedJwt.name,
                    //   "email": decodedJwt.email,
                    //   "auth_token": decodedJwt.sub
                    // }
                //set state of loading and then have it laoding while we send it to the backend
                //then we get actual the id from the backend
            }}
            onError={() => {
                setAppError(new Error('Login Failed. Please try again with different credentials.'))
            }}
        />
  )
}

export default Login
