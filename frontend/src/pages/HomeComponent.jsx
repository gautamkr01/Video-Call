import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');

    const { addToUserHistory } = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <div className="homeComponent">
            <div className="navBar">
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 'clamp(0.1rem, 1vw, 2rem)' }}>
                    <h2>Easy Meet</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginRight: '1rem' }}
                        onClick={() => navigate('/history')}
                    >
                        <IconButton>
                            <RestoreIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <p style={{ color: 'white' }}>History</p>
                    </div>

                    <Button
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/');
                        }}
                        style={{color:"red"}}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2 style={{ paddingBottom: '50px' }}>
                            Providing Quality Video Call Just Like Quality Education
                        </h2>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                id="outlined-basic"
                                label="Meeting Code"
                                variant="outlined"
                                sx={{
                                    input: { color: 'white' },
                                    label: { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white'
                                        }
                                    }
                                }}
                            />
                            <Button onClick={handleJoinVideoCall} variant="contained">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="rightPanel">
                    <video autoPlay muted controls src="/demoVideo.mp4"></video>
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomeComponent);
