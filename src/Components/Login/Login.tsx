import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import jwtDecode  from 'jwt-decode'
import { apiCall } from '../../apiCalls';

const Login = ({ setAppError, logIn }: { setAppError: React.Dispatch<React.SetStateAction<Error | null>>, logIn: (userID: string) => void}) => {
    
    return (
        <GoogleLogin
            onSuccess={ async credentialResponse => {
                const decodedJwt: {name: string, email: string, sub: string} = jwtDecode(credentialResponse.credential!)

                const postUserInfo = await apiCall(null,null, {
                    method: "POST",
                    body: JSON.stringify({
                        "name": decodedJwt.name,
                        "email": decodedJwt.email,
                        // "auth_token": decodedJwt.sub
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                try {
                    const res = await postUserInfo()
                    logIn(res.id)
                    console.log(res)
                } catch (error) {
                    setAppError(new Error('Login Failed. Please try again with different credentials.'))
                }
            }}
            onError={() => {
                setAppError(new Error('Login Failed. Please try again with different credentials.'))
            }}
        />
  )
}

export default Login
