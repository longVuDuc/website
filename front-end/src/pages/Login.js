import React, { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUrl = 'http://localhost:8000/api/login';
    const data = new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password,
    });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    try {
      const response = await axios.post(loginUrl, data, { headers });
      const token = response.data.access_token;

      localStorage.setItem('token', token);

    
      navigate('/'); 
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <Stack className="background-Login">
      <Stack className='Login-formbox'>
        <Typography className='heading' fontSize={'24px'}>Login now</Typography>
        {errorMessage && (
          <Typography color="red" fontSize="20px">
            {errorMessage}
          </Typography>
        )}
        <Stack alignItems={'center'}>
          
          <Typography color='green' fontSize={'32px'}>
              Đăng Nhập
          </Typography>
          <form onSubmit={handleSubmit} className='input-group'>
            <Stack>
              <label className='Lable'>
                Email:
                <input
                  placeholder="Nhập địa chỉ email"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className='input-form'
                />
              </label>
            </Stack>
            <Stack>
              <label className='Lable'>
                Mật Khẩu:
                <input
                  placeholder="Nhập mật khẩu"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
