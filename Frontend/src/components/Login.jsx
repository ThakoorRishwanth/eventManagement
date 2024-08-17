// src/components/Login.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Input, Heading, Text } from '@chakra-ui/react';
import { login } from '../redux/actions/authActions'; // Import the login action

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .then(() => {
        navigate('/tasks');
      })
      .catch((err) => {
        console.error('Login failed:', err);
        // Optionally, handle login failure here
      });
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading mb="6">Login</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="6"
        />
        <Button type="submit" isLoading={loading} colorScheme="teal" mb="4">
          Login
        </Button>
        <Text>
          New user? <Link to="/signup">Sign up here</Link>
        </Text>
        <Text mt="4">
          Admin? <Link to="/admin/login">Login as Admin</Link>
        </Text>
      </form>
    </Box>
  );
};

export default Login;
