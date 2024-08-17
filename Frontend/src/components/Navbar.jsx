// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Box, Flex, Button } from '@chakra-ui/react';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/actions/authActions';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state) => state.auth || {}); // Safeguard for undefined state
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     if (user && user.role === 'admin') {
//       setIsAdmin(true);
//     } else {
//       setIsAdmin(false);
//     }
//   }, [user]);

//   const handleHomeClick = () => {
//     if (isAuthenticated) {
//       navigate('/tasks');
//     } else {
//       navigate('/');
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <Box bg="teal.500" px={4}>
//       <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
//         <Box fontSize="xl" fontWeight="bold" color="white">Event Management</Box>
//         <Flex alignItems={'center'}>
//           <Button colorScheme="teal" variant="ghost" onClick={handleHomeClick}>
//             Home
//           </Button>
//           {!isAuthenticated ? (
//             <>
//               <Link to="/login">
//                 <Button colorScheme="teal" variant="ghost">
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/signup">
//                 <Button colorScheme="teal" variant="ghost">
//                   Signup
//                 </Button>
//               </Link>
//             </>
//           ) : (
//             <>
//               {isAdmin && (
//                 <Link to="/admin/dashboard">
//                   <Button colorScheme="teal" variant="ghost">
//                     Admin Dashboard
//                   </Button>
//                 </Link>
//               )}
//               <Button colorScheme="teal" variant="ghost" onClick={handleLogout}>
//                 Logout
//               </Button>
//             </>
//           )}
//         </Flex>
//       </Flex>
//     </Box>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth || {}); // Safeguard for undefined state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleHomeClick = () => {
    if (isAuthenticated) {
      navigate('/tasks');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleAdminDashboardClick = () => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box fontSize="xl" fontWeight="bold" color="white">Event Management</Box>
        <Flex alignItems={'center'}>
          <Button colorScheme="teal" variant="ghost" onClick={handleHomeClick}>
            Home
          </Button>
          <Button colorScheme="teal" variant="ghost" onClick={handleAdminDashboardClick}>
            Admin Dashboard
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
