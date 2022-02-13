import React from 'react';
import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// import vaccineIcon from '@iconify/icons-tabler/vaccine';


  
import { useState , useEffect} from 'react'
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';

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

// ----------------------------------------------------------------------





export default function AppWeeklySales() {

  const [TOTAL, setTotal] = useState(0);

  const request =async()=>{
    const req = await fetch('http://localhost:1337/api/sum', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		const data = await req.json()
		if (data.status === 'ok') {
      console.log(data)
			setTotal(data.totalcount)
		} else {
			alert(data.error)
		}
  }
  useEffect(()=>{

    const load = async()=>{
      request();
    }

    load();

    
},[]);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={androidFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{TOTAL}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        User Demand
      </Typography>
    </RootStyle>
  );
}