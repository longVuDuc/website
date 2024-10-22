import React, { useState } from 'react';
import { Stack, Typography, Box, colors } from '@mui/material';
// import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useAuth } from "../utils/userAuth";
import '../App.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const { login } = useAuth();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const loginUrl = 'http://localhost:8000/login';
//     const data = new URLSearchParams({
//       grant_type: 'password',
//       username: email,
//       password: password,
//     });
//     const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

//     try {
//       const response = await axios.post(loginUrl, data, { headers });
//       const responseData = response.data.access_token;
//       await login({ responseData });
//     } catch (error) {
//       setErrorMessage(error.response?.data?.detail || 'Login failed');
//     }
//   };

  return (
    <Stack className="background-Login">
      <Stack className='Login-formbox'>
        {/* <Typography className='heading' fontSize={'24px'}>Login now</Typography>
        {errorMessage && (
          <Typography color="red" fontSize="20px">
            {errorMessage}
          </Typography>
        )} */}
        <Stack alignItems={'center'}>
          {/* <form onSubmit={handleSubmit} className='input-group'> */}
          <Typography color='green' fontSize={'32px'}>
            Log In
          </Typography>
          <form className='input-group'>
            <Stack>
              <label className='Lable'>
                Username or Email:
                <input
                  placeholder="Username or Email"
                  name="username"
                  value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className='input-form'
                  color='white'
                />
              </label>
            </Stack>
            <Stack>
              <label className='Lable'>
                Password:
                <input
                  placeholder="Password"
                  name="password"
                  value={password}
                //   onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className='input-form'
                />
              </label>
            </Stack>
            <button className='submit-button'>Login</button>
          </form>
          <Box sx={{ position: 'relative', top: '400px' }}>
            <Stack direction={'row'} spacing={1} alignItems="center">
              <Typography color={'black'}> New Login?</Typography>
              <Link to="/SignUp" style={{ color: 'darkgreen', fontSize: '18px' }}>Signup</Link>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
