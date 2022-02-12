import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'

import getWeb3 from "../getWeb3";
import { useState, useEffect } from 'react';
import document from "../contracts/Manufacturer.json";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Already have an account? '}
      <Link color="inherit" href="/login">
        Login
      </Link>{' '}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const [account,setAccount]=useState('');
  const [contract,setContract]=useState(null);

  useEffect(()=>{
    const loadContract= async()=>{
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = document.networks[networkId]
      if(networkData){            
          const abi = document.abi
          const address = networkData.address
          const contract = new web3.eth.Contract(abi, address)
          await setContract(contract)
      }else{
          window.alert('Smart Contract not deployed to detected network')
      }
      // const Mexists = contract.methods.Exists(account).call();
      // if(Mexists){
      //   navigate('/mdashboard');
      // }
      
    }

    const contract=loadContract();
  },[]);

  const navigate = useNavigate()
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      companyName: data.get("Company_name"),
      manufactureID: data.get("manufacture_id"),
      email: data.get("email"),
      password: data.get("Password_Id"),
      flag: "m",     
      });
    // const response = await fetch('http://localhost:1337/api/manufacturerregister', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     companyname: data.get("Company_name"),
    //     manufacturerID: data.get("manufacture_id"),
    //     email: data.get("email"),
    //     password: data.get("Password_Id"),
    //     flag: "m",     
    //   }),
    // })
    //   const Data = await response.json()
    //   console.log(Data)

		// if (Data.status === 'ok') {
		// 	navigate('/login')
		// }

    await contract.methods.setManuDetails(data.get('Company_name'),data.get('manufacture_id'),data.get('email'))
    .send({ from: account }).then((r)=>{}).catch(err=>console.log(err))

    
    // navigate('/mdashboard')
    

  };

  function seeDetails()
  {
    const details = contract.methods.getManuDetails(account).call()
    console.log(details)
  }

  function redirect()
  {
    const Mexists = contract.methods.Exists(account).call();
      if(Mexists){
        navigate('/mdashboard');
      }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Company_name"
              label="Company Name"
              name="Company_name"
              //autoComplete="company"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="manufacture_id"
              label="Manufacturer Id"
              id="manufacture_id"
              //autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="Password_Id"
              label="Password"
              name="Password_Id"
              type = "password"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Sign Up
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Button onClick={seeDetails}>Click</Button>
      <Button onClick={redirect}>here</Button>

    </ThemeProvider>
  );
}