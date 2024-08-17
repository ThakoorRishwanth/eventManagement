import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../redux/actions/authActions'; // Ensure register action is available
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Heading, Text, FormControl, FormLabel } from '@chakra-ui/react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('admin');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      await dispatch(register(name, email, password, role)); // Register the admin
      navigate('/admin/login'); // Redirect to login page after registration
    } else {
      await dispatch(login(email, password)); // Login the admin
      navigate('/admin/dashboard'); // Redirect to dashboard after login
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading mb="6">{isRegistering ? 'Admin Registration' : 'Admin Login'}</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <FormControl mb="4">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Role</FormLabel>
              <Input
                type="text"
                value={role}
                readOnly
              />
            </FormControl>
          </>
        )}
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb="6">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" isLoading={loading} colorScheme="teal" mb="4">
          {isRegistering ? 'Register' : 'Login'}
        </Button>
        <Button 
          onClick={() => setIsRegistering(!isRegistering)} 
          colorScheme="blue" 
          variant="outline"
        >
          {isRegistering ? 'Already have an account? Login' : 'Need to register? Sign Up'}
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
