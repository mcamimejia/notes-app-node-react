import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../src/assets/css/App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<PrivateRoute component={Home}/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
