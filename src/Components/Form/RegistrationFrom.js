import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid' 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {register} from '../../Store/Action';
import {Redirect} from 'react-router-dom';
 

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

const RegistrationFrom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [registered, setRegistered] = useState(false);
  const [country, setCountry] = useState({
    name: "",
    flag: "",
    callingCode: "",
  });

  const [firstName, setFirstName] = useState({value: "", error: false, errMsg: "Invalid first name"});
  const [middleName, setMiddleName] = useState({value: "", error: false, errMsg: "Invalid  middle name"});
  const [lastName, setLastName] = useState({value: "", error: false, errMsg: "Invalid last name"});
  const [email, setEmail] = useState({value: "", error: false, errMsg: "Invalid email address"});
  const [password, setPassword] = useState ({value: "", error: false, errMsg: "Invalid Password"});
  const [confirmPw, setConfirmPw] = useState({value: "", error: false, errMsg: "wrong"});
  const [contact, setContact] = useState({value: "", error: false, errMsg: "invalid contact number"});
  const [city, setCity] = useState({value: "", error: false, errMsg: "Invalid city"});
  const [state, setState] = useState({value: "", error: false, errMsg: "Invalid state"});
  const [error, setError] = useState({status: false, type:"error", msg:""});
  
  const getInfoCountry = async(code)=> {
    const api = "https://restcountries.eu/rest/v2/name/"+ code;
    console.log(api);
    await axios.get(api)
    .then(res=>{
      console.log(res.data[0]);
        country.flag= res.data[0].flag;
        country.name = res.data[0].name;
        country.callingCode= res.data[0].callingCodes[0];
        setCountry({...country});
    })
    .catch(err=> console.log(err));
  };
 
  useEffect (()=>{
    getInfoCountry("NP");
    console.log("country data ", country);
  },[]);

  
  const firstNameChangeHandler = (e) => {
    firstName.value = e.target.value;  
    if(firstName.value.trim().length > 0){
      const error  =  !((/^[a-zA-Z. ]+$/).test(firstName.value))
      setFirstName({...firstName, error: error});
      console.log(firstName.error)
    }else{
      setFirstName({...firstName, error: true});
    }
  }

  const middleNameChangeHandler = (e) => {
    middleName.value = e.target.value;  
    if(middleName.value.trim().length > 0){
      const error  =  !((/^[a-zA-Z ]+$/).test(middleName.value))
      setMiddleName({...middleName, error: error});
      console.log(middleName.error)
    }else if(middleName.value.trim().length === 0){
      setMiddleName({...middleName, error: false})
    }
    else{
      setMiddleName({...middleName, error: true});
    }
  }

  const lastNameChangeHandler = (e) => {
    lastName.value = e.target.value;  
    if(lastName.value.trim().length > 0){
      const error  =  !((/^[a-zA-Z ]+$/).test(lastName.value))
      setLastName({...lastName, error: error});
      console.log(lastName.error)
    }else{
      setLastName({...lastName, error: true});
    }
  }


  const emailChangeHandler = (e) => {
    email.value = e.target.value;  
    if(email.value.trim().length > 0){
      // const error  =  !((/^[a-zA-Z]+[.0-9a-zA-Z]+@[a-zA-Z]{2,}.[a-zA-Z_.]+$/).test(email.value))
      const error  =  !((/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(email.value))
      
      setEmail({...email, error: error});
      console.log(email.error)
    }else{
      setEmail({...email, error: true});
    }

  }
   
  const passwordChangeHandler = (e) => {
    password.value = e.target.value;  
    if(password.value.trim().length > 0){
      const error  =  !((/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,16}$/).test(password.value))
      setPassword({...password, error: error, errMsg: "must be 8-16 characters with combination of letters, digits & symbols"});
      console.log(password.error)
    }else{
      setPassword({...password, error: true});
    }
  }

  const checkPw = () => {
    setConfirmPw({...confirmPw, error: !password.value===confirmPw.value});
  }
  const confirmPwChangeHandler = (e) => {
    confirmPw.value = e.target.value; 
    const error = !(confirmPw.value === password.value) ;
    console.log(error);
    setConfirmPw({...confirmPw, error});
    console.log(confirmPw);
  }

  const cityChangeHandler = (e) => {
    city.value = e.target.value;  
    if(city.value.trim().length > 0){
      const error  =  !((/^[ a-zA-Z]+[ 0-9.-a-zA-Z]*$/).test(city.value))
      setCity({...city, error: error});
      console.log(city.error)
    }else{
      setCity({...city, error: true});
    }
  }

  const stateChangeHandler = (e) => {
    state.value = e.target.value;  
    if(state.value.trim().length > 0){
      const error  =  !((/^[ a-zA-Z]+[ 0-9.-a-zA-Z]*$/).test(state.value))
      setState({...state, error: error});
      console.log(state.error)
    }else{
      setState({...state, error: true});
    }
  }


  const contactChangeHandler = (e) => {
    contact.value = e.target.value;  
    if(contact.value.trim().length > 0){
      const error  =  !((/^[0-9]{8}$/).test(contact.value)|| (/^[0-9]{10}$/).test(contact.value))
      setContact({...contact, error: error});
      console.log(contact.error)
    }else{
      setContact({...contact, error: true});
    }
  }

 
  const validate = () => {
       
      if(firstName.error || middleName.error || lastName.error || email.error || password.error || confirmPw.error ||
        city.error || state.error || contact.error){
            setError({...error, status: true, type: "error", msg: "Please fill the form properly"})
             
            setTimeout(()=> {
                setError({...error, status: false});
            },4000);
            return false;
        }else {
             
            return true;
        }


  }
  const registerUser = async(e) => {

    e.preventDefault();
    checkPw();
    if(validate()){
         
        const data = {
          firstName: firstName.value,
          middleName: middleName.value,
          lastName: lastName.value,
          email: email.value,
          contact: contact.value,
          city: city.value,
          state: state.value,
          password: password.value
        };
        setError({...error, status: true, type: "success", msg: "Registered Successfully"}); 
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value)
        setRegistered(true);
        dispatch(register(data));  
    }
        
  } 
  return ( registered ? (<Redirect to="/login"></Redirect>):
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className = {classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1">
          REGISTRATION
        </Typography>
        <form className={classes.form} method="POST" onSubmit = {registerUser}>
            { error.status && <Alert severity="error" style={{margin: "1rem 0"}}>{error.msg}</Alert>}
          <Grid container spacing={2}>
            <Grid item   xs={12} md={4}>
              <TextField
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={firstNameChangeHandler}
                error = {firstName.error}
                helperText = {firstName.error && firstName.errMsg}
              />
            </Grid> 

            <Grid item   xs={12} md={4}>
              <TextField
                autoComplete="Middle Name"
                name="Middle Name"
                variant="outlined"
                fullWidth
                id="Middle Name"
                label="Middle Name"
                autoFocus
                onChange={middleNameChangeHandler}
                error = {middleName.error}
                helperText = {middleName.error && middleName.errMsg}
              />
            </Grid> 

            <Grid item   xs={12} md={4}>
              <TextField
                autoComplete="lastName"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
                onChange={lastNameChangeHandler}
                error = {lastName.error}
                helperText = {lastName.error && lastName.errMsg}
              />
            </Grid> 
               
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
             
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                defaultValue = {password.value}
                error = {password.error}
                helperText = {password.error && password.errMsg}
                onChange = {passwordChangeHandler}
              />
              
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"                  
                error = {confirmPw.error}
                helperText = {confirmPw.error && confirmPw.errMsg}
                onChange = { confirmPwChangeHandler}
          
              />
              </Grid>

              <Grid item md={6} xs={12}>
              <TextField
                autoComplete="city"
                name="city"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                autoFocus
                onChange={cityChangeHandler}
                error = {city.error}
                helperText = {city.error && city.errMsg}
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="state"
                name="state"
                variant="outlined"
                required
                fullWidth
                id="state"
                label="State\Province"
                autoFocus  
                onChange={stateChangeHandler}   
                error = {state.error}
                helperText = {state.error && state.errMsg}   
              />
            </Grid>

            <Grid item xs={3} className="countryCode" style={{display:"flex", justifyContent: "space-around", alignItems: "center", fontSize: "1.2rem"}}>
                 <img className="flag" src= {country.flag} alt = {country.name} width="20" height="25"/>
                 <span>{country.callingCode}</span>
            </Grid>

            <Grid item xs={9}>
              <TextField
                autoComplete="contact"
                name="contact"
                variant="outlined"
                required
                fullWidth
                id="contact"
                label="Contact Number"
                autoFocus  
                error = {contact.error}
                helperText = {contact.error && contact.errMsg}
                onChange = {contactChangeHandler}
              />
            </Grid>
             
            <Grid item xs={12}  >
              <a href="none" target="_blank" style={{textAlign: "right"}}>Terms and conditions</a>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="agree" color="primary" required/>}
                label="I Agree"
                
              />
            </Grid>

            

          </Grid>
          <Grid container justify= "space-between">
            <Grid item  xs={5} sm={4}>
              <Link href="/">
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                >
                    Cancel
                </Button>
              </Link>
            </Grid>
            <Grid item sm={4}/>
            <Grid item xs={5} sm={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Have you already registered? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
  
}


export default RegistrationFrom;
 

 


 
  
