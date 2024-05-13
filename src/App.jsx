
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Routes
import { ChakraProvider, Box } from '@chakra-ui/react';
import MainPage from './components/MainPage';
import DetailsPage from './components/DetailsPage';
import NotFound from './components/NotFound'; // Import NotFound component
import './App.css'

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Box maxW="800px" mx="auto" mt={10} p={5}>
          <Routes> {/* Use Routes component instead of Switch */}
            <Route path="/" element={<MainPage />} /> {/* Use "element" prop instead of "component" */}
            <Route path="/details/:repoId" element={<DetailsPage />} /> {/* Use "element" prop instead of "component" */}
            <Route path="*" element={<NotFound />} /> {/* Route for 404 page */}
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;


