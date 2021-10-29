import React, { useState } from 'react';
import './loginpage.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import axios from 'axios'

export default function Loginpage() {

  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory()

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const redirectPage = token => {
    console.log('redirect')
    sessionStorage.setItem('accessToken', JSON.stringify(token))
    history.push('/')
  }

  const handleLogin = async () => {
    try {
      const loginUserData = {
        password: password,
        email: email,
      }
      
      const loginRequest = await axios
        .post('https://magnifionode-api.herokuapp.com/users/login',
          loginUserData
        )
        .then(data => {
          console.log(data)
          return data
        })
        .catch(err => 
          toast.error(err.response.data.message)
        );

        const { message } = loginRequest.data;
    
        if (message) {
          toast.success(message);
          // history.push("/")
          setTimeout(() => {
            redirectPage("secretToken")
          }, 3000)
        }
      } catch (error) {
        toast.error(error);
      }
  }

  return (
    <div className="login">
      <ToastContainer
        position="top-center"
        autoClose={false}
        theme="dark"
      />
      <div className="login-page">
        <aside className="left"></aside>
        <aside className="right">
          <h1>Login</h1>
          <form className="login-details">
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={handleEmail}
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={handlePassword}
            />
            <span className="forgot-password">forgot password?</span>
            <span type="submit" className="login-button" onClick={handleLogin}>
              Sign In
            </span>
            <span className="login-page-create-account">
              Not registered yet?{' '}
              <Link to="/register" style={{ color: 'blue', paddingLeft: '4px', textDecoration: 'none' }}>
                Create an account
              </Link>
            </span>
          </form>
        </aside>
      </div>
    </div>
  );
}
