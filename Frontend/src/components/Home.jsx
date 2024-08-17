import React, { useEffect } from 'react';
import { Box, Button, Container, Heading, Text, VStack, Spinner } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserEvents } from '../redux/actions/authActions'; // Import your action to fetch events

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To navigate programmatically
  const { isAuthenticated, loading, events } = useSelector((state) => state.auth); // Assuming `auth` state has `isAuthenticated`, `loading`, and `events`

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(events());
    }
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return (
      <Container maxW="container.lg" p={4} centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (isAuthenticated) {
    // Redirect to tasks page if authenticated
    navigate('/tasks');
  }

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl" textAlign="center">
          Welcome to the Event Management System
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Manage, register, and keep track of events with ease.
        </Text>
        <Box>
          <Link to="/login">
            <Button colorScheme="teal" size="lg" mr={4}>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button colorScheme="blue" size="lg">
              Signup
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};

export default Home;
