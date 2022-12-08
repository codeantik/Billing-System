import React, { useState, useEffect } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, useToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory()

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleSignup = async () => {
    try {
      const registerUserData = {
        username: username,
        password: password,
        email: email
      };

      const registerRequest = await axios
          .post(
            'https://appleute-server.vercel.app/v1/auth/register',
            registerUserData
          )
          .then(data => {
            console.log(data)
            return data;
          })
          .catch((err) => {
            toast.error(err.response.data.message)
          })

          const { message } = registerRequest.data;

          if (message) {
            toast.success(message);
            setTimeout(() => {
              history.push('/login')
            }, 3000)
          }
      } catch (error) {
          toast.error(error)
      }
  };

  return (
    <div className="register-page-container">
      <ToastContainer 
        position="top-center" 
        autoClose="5000" 
        theme="dark" 
      />
      <div className="register">
        <aside className="left"></aside>
        <aside className="right">
          <h1>Register</h1>
          <form className="register-details">
            <p>Username</p>
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={handleUsername}
            />
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
            <span
              type="submit"
              className="register-button"
              onClick={handleSignup}
            >
              Sign Up
            </span>
            <span className="register-page-create-account">
              Already have an account?
              <Link
                to="/login"
                style={{
                  color: 'blue',
                  paddingLeft: '4px',
                  textDecoration: 'none'
                }}
              >
                Login
              </Link>
            </span>
          </form>
        </aside>
      </div>
    </div>
  );
}
