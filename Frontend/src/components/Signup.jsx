// src/components/Signup.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Input, Heading, Text } from '@chakra-ui/react';
import { register } from '../redux/actions/authActions'; // Import the register action

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password))
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.error('Registration failed:', err);
        // Optionally, handle registration failure here
      });
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading mb="6">Sign Up</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb="4"
        />
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
          Sign Up
        </Button>
        <Text>
          Already have an account? <Link to="/login">Login here</Link>
        </Text>
      </form>
    </Box>
  );
};

export default Signup;
