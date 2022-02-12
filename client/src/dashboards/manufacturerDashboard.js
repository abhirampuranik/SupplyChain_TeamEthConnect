// import React from "react";
// import getWeb3 from "../getWeb3";
// import { useState, useEffect } from 'react';
// import document from "../contracts/Manufacturer.json";

// function ManuDash(){
    
//     // const [account,setAccount]=useState('');
//     // const [contract,setContract]=useState(null);

//     // useEffect(()=>{
//     // const loadContract= async()=>{
//     //     const web3 = await getWeb3();
//     //     const accounts = await web3.eth.getAccounts()
//     //     console.log(accounts)
//     //     setAccount(accounts[0])

//     //     const networkId = await web3.eth.net.getId()
//     //     const networkData = document.networks[networkId]
//     //         if(networkData){            
//     //             const abi = document.abi
//     //             const address = networkData.address
//     //             const contract = new web3.eth.Contract(abi, address)
//     //             setContract(contract)
//     //         }else{
//     //             window.alert('Smart Contract not deployed to detected network')
//     //         }
//     // }

//     // const contract=loadContract();
//     // },[]);


//     // const details = contract.methods.getManuDetails(account).call()
//     // console.log(details)







//     return <h1>Manufacturer Dash</h1>
// }
// export default ManuDash


// material
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
import getWeb3 from "../getWeb3";
import { useState, useEffect } from 'react';
import document from "../contracts/Transporter.json";
import Button from '@mui/material/Button';

export default function DashboardApp() {
  const [account,setAccount]=useState('');
  const [contract,setContract]=useState(null);
  
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
  }


  useEffect(()=>{
  loadContract();
},[]);

function seeDetails()
{
  console.log("hello")
  const details = contract.methods.getTranNames().call()
  console.log(details)
}

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
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
      <Button onClick={seeDetails}>Click</Button>

    </Page>
    
  );
}
