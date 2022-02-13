// import faker from 'faker';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
// material
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
// utils
// import { fDateTime } from '../../../utils/formatTime';

import getWeb3 from "../getWeb3";
import { useState, useEffect } from 'react';
import document from "../contracts/tracking.json";

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: 'Manufacturer',
    // time: faker.date.past(),
    type: 'order1'
  },
  {
    title: 'Transporter',
    // time: faker.date.past(),
    type: 'order2'
  },
  {
    title: 'Distributer',
    // time: faker.date.past(),
    type: 'order3'
  },
  {
    title: 'Regional Centre',
    // time: faker.date.past(),
    type: 'order4'
  }
];

// ----------------------------------------------------------------------

// OrderItem.propTypes = {
//   item: PropTypes.object,
//   isLast: PropTypes.bool
// };

// function OrderItem({ item, isLast }) {


//   const { type, title, time } = item;
//   return (
//     <TimelineItem>
//       <TimelineSeparator>
//         <TimelineDot
//           sx={{
//             bgcolor:
//               (type === 'order1' && 'primary.main') ||
//               (type === 'order2' && 'primary.main') ||
//               (type === 'order3' && 'primary.main') ||
//               (type === 'order4' && 'primary.main') ||
//               'error.main'
//           }}
//         />
//         {isLast ? null : <TimelineConnector />}
//       </TimelineSeparator>
//       <TimelineContent>
//         <Typography variant="subtitle2"><h2>{title}</h2></Typography>
//         <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//           <h4></h4>
//         </Typography>
//       </TimelineContent>
//     </TimelineItem>
//   );
// }

export default function AppOrderTimeline() {

  const [account,setAccount]=useState('');
  const [contract,setContract]=useState(null);
  const [mColor, setmState]=useState('grey');
  const [tColor, settState]=useState('grey');
  const [dColor, setdState]=useState('grey');
  const [rColor, setrState]=useState('grey');

  OrderItem.propTypes = {
    item: PropTypes.object,
    isLast: PropTypes.bool
  };

  function OrderItem({ item, isLast }) {
    const { type, title, time } = item;
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              bgcolor:
                (type === 'order1' && mColor)||
                (type === 'order2' && tColor) ||
                (type === 'order3' && dColor) ||
                (type === 'order4' && rColor) ||
                'error.main'
            }}
          />
          {isLast ? null : <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="subtitle2"><h2>{title}</h2></Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            <h4></h4>
          </Typography>
        </TimelineContent>
      </TimelineItem>
    );
  }


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
    }

    const contract=loadContract();
  },[]);

  const update = async()=>{
    const mc = await contract.methods.getmColor().call();
    
    if(mc){
      setmState('green');
      console.log(mc);
    }
    const tc = await contract.methods.gettColor().call();
    if(tc){
      settState('green');
    }
    const dc = await contract.methods.getdColor().call();
    if(dc){
      setdState('green');
    }
    const rc = await contract.methods.getrColor().call();
    if(rc){
      setrState('green');
    }
  }
  console.log(mColor)

  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
      <Button onClick={update}>Update</Button>
    </Card>
  );
}
