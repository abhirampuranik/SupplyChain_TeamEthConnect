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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


export default function DashboardApp() {
  const [account,setAccount]=useState('');
  const [contract,setContract]=useState(null);
  const [selectedTran, setTran]=useState(null);
  const [selectedTranId, setTranId]=useState(null);
  const [tranList, setTranList] = useState([]);
  const [tranIdList,setTranIdList] = useState([]);
  
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

  const handleChange = (event) => {
    setTran(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('quantity') +" "+ selectedTran);
    await contract.methods.getPackage(data.get('quantity')," ")
    .send({ from: account }).then((r)=>{}).catch(err=>console.log(err))
  };



  useEffect(()=>{
    loadContract();
},[]);

const confirmSelection = async(event)=>{
  for(var k=0;k<tranList.length;k++){
    if(tranList[k]===selectedTran){
      setTranId(tranIdList[k])
      break
    }
  }  
  console.log(selectedTranId)
}

const submit = async(event)=>{
  
}

function seeDetails()
{
  console.log("hello")
  const details = contract.methods.getTranNames().call()
  console.log(selectedTran)
}

const chooseSelect = async() =>{
  const traList = await contract.methods.getTranNames().call();
  setTranList(traList);
  setTran(traList[0]);
  const traAdd = await contract.methods.getTranAdd().call();
  setTranIdList(traAdd);
  setTranId(traAdd[0]);
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

        <Button onClick={seeDetails}>Click</Button>
        <Button onClick={chooseSelect}>Choose</Button>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Transporter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTran}
            label="Age"
            onChange={handleChange}
          >
            {tranList.map((name)=>(                        
              <MenuItem value={name}>{name}</MenuItem>                     
            ))}    
          </Select>
        </FormControl>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>  
          <TextField
              margin="normal"
              required
              fullWidth
              name="quantity"
              label="Quantity"
              id="quantity"
              autoComplete="quantity"
            />
            <Button onClick={confirmSelection}>Confirm</Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Submit
            </Button>
        </Box>
      </Box>
      
      {/* <Button onClick={submit}>Submit</Button> */}


      </Container>
      


    </Page>
    
  );
}
