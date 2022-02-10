import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';






export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50vh',
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="xl">
          {/* <Typography variant="body1">
          <LinkedInIcon className='SocialIcons'/>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/" style={{color:"white"}} target='_blank'><GitHubIcon className='SocialIcons'/></Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <FacebookIcon className="SocialIcons"/>&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <Copyright /> */}

          <Typography variant="body2" align='center' color="#FFFFFF">Made with &nbsp;<span style={{color:"red"}}>❤</span> &nbsp; by Team EthConnect</Typography>
        </Container>
        
      </Box>
    </Box>
  );
}
