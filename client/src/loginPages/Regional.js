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
import document from "../contracts/Regional.json";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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
          setContract(contract)
      }else{
          window.alert('Smart Contract not deployed to detected network')
      }
    }

    const contract=loadContract();
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    contract.methods.setRegDetails(data.get('region_Name'),data.get('region_Id'),data.get('email'))
    .send({ from: account }).then((r)=>{}).catch(err=>console.log(err))

    const details = contract.methods.getRegDetails(account).call()
    console.log(details)
  };

  const navigate = useNavigate()
  function redirect()
  {
    const Dexists = contract.methods.Exists(account).call();
      if(Dexists){
        navigate('/rdashboard');
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
              id="region_Name"
              label="Region Name"
              name="region_Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="region_Id"
              label="Region Id"
              id="region_Id"
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
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Sign Up
            </Button>
            <Button 
              onClick={redirect}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Login
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}