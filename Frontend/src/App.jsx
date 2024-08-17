// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import AdminLogin from './pages/AdminLogin';
// import Tasks from './pages/Tasks';
// import AdminDashboard from './components/AdminDashboard';
// import Home from './components/Home';
// import ProtectedRoute from './components/ProtectedRoutes';
// import { useSelector } from 'react-redux';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// function App() {
//   const { isAuthenticated, role } = useSelector((state) => state.auth);

//   return (
//     <>
//     <Navbar />
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/admin/login" element={<AdminLogin />} />
//       <Route 
//         path="/tasks" 
//         element={
//           <ProtectedRoute element={Tasks} isAuthenticated={isAuthenticated} />
//         } 
//         />
//       <Route 
//         path="/admin/dashboard" 
//         element={
//           <ProtectedRoute element={AdminDashboard} isAuthenticated={isAuthenticated} isAdmin={role === 'admin'} />
//         } 
//         />
//     </Routes>
//     <Footer />
//         </>
//   );
// }

// export default App;

// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminLogin from './pages/AdminLogin';
import Tasks from './pages/Tasks';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const isAdmin = role === 'admin';

  return (
    <>
    <Box d="flex" flexDir="column" minH="91vh">
      <Navbar />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Tasks />
              </ProtectedRoute>
            } 
            />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
            />
        </Routes>
      </Box>
    </Box>
      <Footer />
            </>
  );
}

export default App;
