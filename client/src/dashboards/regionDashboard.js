import React from 'react';

import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../dashcomponents/Page';
// import {
// //   AppTasks,
// //   AppNewUsers,
// //   AppBugReports,
// //   AppItemOrders,
//   AppWeeklySales
// //   AppOrderTimeline
// } from '../dashcomponents/AppWeeklySales';
import AppWeeklySales from '../dashcomponents/AppWeeklySales';
import AppOrderTimeline from '../dashcomponents/AppOrderTimeline';
// ----------------------------------------------------------------------
import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card } from '@mui/material';

import getWeb3 from "../getWeb3";
import { useState, useEffect } from 'react';
import document from "../contracts/Regional.json";
import Button from '@mui/material/Button';
import tracking from "../contracts/tracking.json";
// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));


export default function DashboardApp() {

  const [account,setAccount]=useState('');
  const [contract,setContract]=useState(null);
  const [quantity,setQuantity]=useState('0');
  const [trackContract, settrackContract]=useState(null);

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
          const c = new web3.eth.Contract(abi, address)
          setContract(c)
      }else{
          window.alert('Smart Contract not deployed to detected network')
      }


      const tracknetworkData = tracking.networks[networkId]
      if(tracknetworkData){            
          const abi = tracking.abi
          const address = tracknetworkData.address
          const contract = new web3.eth.Contract(abi, address)
          await settrackContract(contract)
      }else{
          window.alert('Smart Contract not deployed to detected network')
      }
  }

  useEffect(()=>{
    loadContract();
  },[]);

  const getRecieved = async(event)=>{
    console.log("recievd");
    const q = await contract.methods.getQuantity().call()
    setQuantity(q)
    await trackContract.methods.setrColor().send({ from: account }).then((r)=>{}).catch(err=>console.log(err))
  }

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
          <RootStyle>
              <IconWrapperStyle>
                <Icon icon={androidFilled} width={24} height={24} />
              </IconWrapperStyle>
              <Typography variant="h3">{quantity}</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Received
              </Typography>
            </RootStyle>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
      <Button onClick={getRecieved}>Received count</Button>
    </Page>
  );
}