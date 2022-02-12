import React,  { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken'

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

    </div>
}
export default UserDash
