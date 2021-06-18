import React, {useState} from 'react'
import {Container, Grid, Button, Typography, Avatar, TextField, Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',  
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const LoginForm = () => {
    
    const classes = useStyles();
    const {user} = useSelector(state=> state);
    console.log(user);
    const [email, setEmail] = useState({value: "", error: false, errMsg: "Invalid email address"});
    const [password, setPassword] = useState ({value: "", error: false, errMsg: "Invalid Password"});

    const emailChangeHandler = (e) => {
        setEmail({...email, value: e.target.value});
    }

    const passwordChangeHandler =(e) => {
        setPassword({...password, value: e.target.value});
    }
    const [login, setLogin] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        if((/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(email.value) && (/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,16}$/).test(password.value)){
            if(email.value=== user.email && password.value === user.password)
                setLogin(true);
            else{
                setEmail({...email, error: true});
                setPassword({...password, error: true})
            }
        }else{
            setEmail({...email, error: true});
            setPassword({...password, error: true})
        }

    }
    return ( login ? <Redirect to="/home"/>:
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h6">
                        LOGIN
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error = {email.error}
                                    helperText = {email.error && email.errMsg}
                                    onChange = {emailChangeHandler}
                                    
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    error = {password.error}
                                    helperText = {password.error && password.errMsg}
                                    onChange = {passwordChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>    
                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link href="/registration" variant="body2">
                                Do not have an account? Register now
                            </Link>
                            </Grid>
                        </Grid>                    
                    </form>
            </div>
        </Container>
    )
}

export default LoginForm
