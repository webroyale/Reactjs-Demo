import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Link} from 'react-router-dom';

const useStyles = makeStyles(()=> ({
    container: {
        width: "100%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "center",
    },
    loginBtn: {
        marginTop: "2rem",
    }, 
    link: {
        textDecoration: "none",
        color: "#fff",
    }
}));
const Greeting = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant="h3" color="primary">
                Hello Good Looking Stranger !! 
            </Typography>
            <Typography variant="h5" color="primary">
                Welcome to my app. Lets' Rock
            </Typography>
            <Link to="/login" className={classes.link}>
            <Button className={classes.loginBtn} variant="contained" color="primary">Login</Button>
            </Link>
        </div>
    )
}

export default Greeting
