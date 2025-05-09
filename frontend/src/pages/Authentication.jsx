import * as React from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Typography,
    Snackbar,
    IconButton
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                const result = await handleRegister(name, username, password);
                setUsername('');
                setPassword('');
                setMessage(result);
                setOpen(true);
                setError('');
                setFormState(0);
            }
        } catch (err) {
            const msg = err?.response?.data?.message || 'Authentication error';
            setError(msg);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        width: '100%',
                        maxWidth: 420,
                        p: 4,
                        backgroundColor: 'white',
                        color: '#333',
                        borderRadius: 3,
                        position: 'relative',
                    }}
                >
                    {/* Back Button */}
                    <IconButton
                        onClick={() => navigate('/')}
                        sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            backgroundColor: '#f0f0f0',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        }}
                        size="small"
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 2
                        }}
                    >
                        <Avatar
                            sx={{
                                m: 1,
                                bgcolor: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
                                background: 'linear-gradient(135deg, #42a5f5, #7e57c2)'
                            }}
                        >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                            {formState === 0 ? 'Sign In' : 'Sign Up'}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                            <Button
                                variant={formState === 0 ? 'contained' : 'outlined'}
                                onClick={() => setFormState(0)}
                                fullWidth
                                sx={{
                                    textTransform: 'none',
                                    bgcolor: formState === 0 ? '#42a5f5' : 'white',
                                    color: formState === 0 ? 'white' : '#42a5f5',
                                    borderColor: '#42a5f5',
                                    '&:hover': {
                                        bgcolor: formState === 0 ? '#1e88e5' : '#e3f2fd'
                                    }
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                variant={formState === 1 ? 'contained' : 'outlined'}
                                onClick={() => setFormState(1)}
                                fullWidth
                                sx={{
                                    textTransform: 'none',
                                    bgcolor: formState === 1 ? '#7e57c2' : 'white',
                                    color: formState === 1 ? 'white' : '#7e57c2',
                                    borderColor: '#7e57c2',
                                    '&:hover': {
                                        bgcolor: formState === 1 ? '#673ab7' : '#ede7f6'
                                    }
                                }}
                            >
                                Register
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    variant="outlined"
                                />
                            )}

                            <TextField
                                margin="normal"
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                variant="outlined"
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                variant="outlined"
                            />

                            {error && (
                                <Typography color="error" sx={{ mt: 1 }}>
                                    {error}
                                </Typography>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    textTransform: 'none',
                                    background: 'linear-gradient(45deg, #42a5f5, #7e57c2)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1e88e5, #5e35b1)'
                                    }
                                }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? 'Login' : 'Register'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>

                <Snackbar open={open} autoHideDuration={4000} message={message} />
            </Box>
        </ThemeProvider>
    );
}
