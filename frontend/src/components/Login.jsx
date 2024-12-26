import React, { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import appApi from '../api/appApi';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Container, Card } from './Container';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const api = appApi();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');
        if(validateInputs()){
            try {
                const response = await api.post('/api/login', {
                    data: {
                        userName: userName,
                        password: password,
                    }
                });

                if (response.status === 200) {
                    const { token, userId } = response.data;
                    login(token, userName, userId);
                    navigate('/');
                } else {
                    setError('Login failed');
                }
            } catch (error) {
                setError(error.response?.data?.error || 'Error Logging in');
            }
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');
        if(validateInputs()){
            try {
                const response = await api.post('/api/create-user', {
                    data: {
                        userName: userName,
                        password: password,
                    }
                });

                if (response.status === 200) {
                    setUserName('');
                    setPassword('');
                    setInfoMessage('User created successfully')
                } else {
                    setError('Error creating user');
                }
            } catch (error) {
                setError(error.response?.data?.error || 'Error creating user');
            }
        }
    };

    const validateInputs = () => {
        let isValid = true;
    
        if (!userName || userName.length < 3) {
          setUserNameError(true);
          setUserNameErrorMessage('Please enter a valid User Name.');
          isValid = false;
        } else {
          setUserNameError(false);
          setUserNameErrorMessage('');
        }
    
        if (!password || password.length < 6) {
          setPasswordError(true);
          setPasswordErrorMessage('Password must be at least 6 characters long.');
          isValid = false;
        } else {
          setPasswordError(false);
          setPasswordErrorMessage('');
        }
    
        return isValid;
    };

    return (
        <Container direction="column" justifyContent="space-between">
            <Stack
                sx={{
                    justifyContent: 'center',
                    height: '100vh',
                    p: 2,
                }}
            >
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                Sign in
                </Typography>
                <Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                        autoFocus
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        error={userNameError}
                        helperText={userNameErrorMessage}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordErrorMessage}
                    />
                    {error && (
                        <Typography variant="body2" color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    {infoMessage && (
                        <Typography variant="body2" color="success" align="center">
                            {infoMessage}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button sx={{ mt: 3, mb: 2 }} type="submit" variant="outlined" onClick={handleSignUp}> Sign Up</Button>
                        <Button sx={{ mt: 3, mb: 2 }} type="submit" variant="contained" onClick={handleLogin}> Sign In</Button>
                    </Box>
                </Box>
            </Card>
            </Stack>
        </Container>
    );
}

export default Login;