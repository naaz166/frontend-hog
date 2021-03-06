import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormLabel } from '@material-ui/core';
import {toast} from 'react-toastify';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundImage:`url(${"/assets/pic1.jpg"})`,
    backgroundColor:'white',
    opacity:'0.85',
    height:'600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));
const Login = (props) => {
  const classes = useStyles();
  // create state variables for each input
  const [disabled, cDisabled] = useState(false);
  const submitHandler = (e) => {
  console.log("submitted");
  e.preventDefault();
  cDisabled(true);
  props.client
    .login(e.target.username.value,e.target.password.value)
    .then( (response) => {
      cDisabled(false);
      console.log(response.data);
      props.loggedIn(response.data.token,response.data.role,response.data.username,response.data.profileForm);
      console.log(response.data.profileForm);
    })
    .catch((error) => {
    toast.error("Bad user credentials")
    cDisabled(false);
    });
  };
  return (
    <form className={classes.root} onSubmit={(e) => submitHandler(e)}>
      <h2>Login</h2>
      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
        <TextField
        label="Username"
        variant="filled"
        required
        name="username"
        // value={username}
        />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        name="password"
        // value={password}
      />
        <div>
        <Button type="submit" variant="contained" color="primary">
        {" "}
          Submit{" "}
        </Button>
    </div>
    </form>
  );
};
export default Login;