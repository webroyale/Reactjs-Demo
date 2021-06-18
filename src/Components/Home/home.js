import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {useSelector} from 'react-redux';

const useStyles = makeStyles(()=> ({
    container: {
        width: "100%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "center",
    },
    logoutBtn: {
        marginTop: "3rem",
    }, 
    
}));
const Home = () => {
    const classes = useStyles();
    const {firstName, middleName, lastName} = useSelector(state=> state.user);

    const logout = () => {
        window.location.replace("/")
    }
    return (
        <div className={classes.container}>
             
            <Typography variant="h3" color="primary">
                Logged in as:: {`${firstName} ${middleName} ${lastName}`}
            </Typography>
             
            <Button className={classes.loginBtn} variant="contained" onClick={logout} color="secondary">Logout</Button>
             
        </div>
    )
}

export default Home
