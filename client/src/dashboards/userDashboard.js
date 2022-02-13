import React,  { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Page from '../dashcomponents/Page';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import { Box, Grid, Container, Typography } from '@mui/material';
import AppWeeklySales from '../dashcomponents/AppWeeklySales';
import AppOrderTimeline from '../dashcomponents/AppOrderTimeline';


function UserDash(){
    const [RequestAid, setrequestAid] = useState('Not requested')
    const navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem("token"))
        // setrequestAid("Not Requested")
		// const token = localStorage.getItem('token')
		// if (token) {
		// 	const user = jwt.decode(token)
		// 	if (!user) {
        //         console.log("issue in login")
		// 		localStorage.removeItem('token')
		// 		navigate('/login')
		// 	} else {
		// 		setrequestAid("Not requested")
		// 	}
		// }

	}, [])

    
    async function requestAid(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:1337/api/requestregion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                
            }),
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setrequestAid("Requested")
        } else {
            alert(data.error)
        }
    }
    


    return <div>
        <Button onClick={requestAid}>Request Aid</Button>

        <h1>Hello user</h1>
        <h1>Your request: {RequestAid}</h1>
        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                <Typography variant="h4">Hi, Welcome back</Typography>
                </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppWeeklySales />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <AppOrderTimeline />
                        </Grid>
                    </Grid>
            </Container>
        </Page>
    </div>
}
export default UserDash