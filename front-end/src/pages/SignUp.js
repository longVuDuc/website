import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Stack, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate(); // This should be called here
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/"); 
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8000/api/register';
        
        try {
            let result = await axios.post(url, formData);
            setSuccessMessage('You have created an account successfully!');
            setErrorMessage('');
            setFormData({
                name: '',
                password: '',
                email: ''
            });
            localStorage.setItem("user-info", JSON.stringify(result.data)); 
            navigate('/'); 
        } catch (error) {
            console.error('Error during registration:', error);
            const errorDetail = error.response?.data?.detail || 'Registration failed';
            setErrorMessage(
                typeof errorDetail === 'string' ? errorDetail : JSON.stringify(errorDetail)
            );
            setSuccessMessage('');
        }
    };

    return (
        <Stack className="background-Login">
            <Stack className='Signup-formbox' alignItems={'center'} mt={'5%'}>
                {errorMessage && (
                    <Typography color="red" textAlign="center" fontSize="20px">
                        {errorMessage}
                    </Typography>
                )}
                {successMessage && (
                    <Typography color="green" textAlign="center" fontSize="20px">
                        {successMessage}
                    </Typography>
                )}
                <Typography color='green' fontSize={'24px'}>Tạo Tài Khoản Mới</Typography>
                <Stack alignItems={'center'}>
                    <form onSubmit={handleSubmit} className='input-group'>
                        <Stack>
                            <label className='Lable'>
                                Tên:
                                <input
                                    placeholder="Nhập tên"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    className='input-form'
                                />
                            </label>
                        </Stack>
                        <Stack>
                            <label className='Lable'>
                                Email:
                                <input
                                    placeholder="Nhập địa chỉ Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    className='input-form'
                                />
                            </label>
                        </Stack>
                        <button className='submit-button'>Register</button>
                    </form>
                    <Box sx={{ position: 'relative', top: '500px' }}>
                        <Stack direction={'row'} spacing={1} alignItems="center">
                            <Typography>
                                Already have an account?
                                <Link to="/login" style={{ color: 'darkgreen' }}> Log In</Link>
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SignUp;
