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

  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("User_name"),
      aadhar: data.get("Aadhar_id"),
      email: data.get("email"),
      region: data.get("Region_Name"),
      password: data.get("Password_Id")
    });

    const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
        username: data.get("User_name"),
        aadhar: data.get("Aadhar_id"),
        email: data.get("email"),
        region: data.get("Region_Name"),
        password: data.get("Password_Id"),
        flag: 'u',
			}),
		})

		const Data = await response.json()

		if (Data.status === 'ok') {
			navigate('/login')
		}


  };


  // function 

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
              id="User_name"
              label="User Name"
              name="User_name"
              //autoComplete="company"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Aadhar_id"
              label="Aadhar Number"
              id="Aadhar_id"
              // onChange={(e)=>(e.target.value)}
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

            <TextField
              margin="normal"
              required
              fullWidth
              id="Region_Name"
              label="Region Name"
              name="Region_Name"
              //autoComplete="company"
              autoFocus
            />

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


            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              // onClick={}
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
    </ThemeProvider>
  );
}