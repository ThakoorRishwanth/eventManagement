import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions'; // Import logout action

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth || {}); // Safeguard for undefined state

  const handleHomeClick = () => {
    if (isAuthenticated) {
      navigate('/tasks');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/'); // Redirect to home or login page
  };

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box fontSize="xl" fontWeight="bold" color="white">Event Management</Box>
        <Flex alignItems={'center'}>
          <Button colorScheme="teal" variant="ghost" onClick={handleHomeClick}>
            Home
          </Button>
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button colorScheme="teal" variant="ghost">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button colorScheme="teal" variant="ghost">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <>
              {user && user.role === 'admin' && (
                <Link to="/admin/dashboard">
                  <Button colorScheme="teal" variant="ghost">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Button colorScheme="teal" variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
