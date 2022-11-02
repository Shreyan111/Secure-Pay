import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';


export default function SignInSide({ classes, setExistingHandler }) {
    const [values, setValues] = useState({
        name: '',
        phoneNumber: '',
        age: '',
        gender: '',
        instagramUsername: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const valueChangeHandler = (props) => (event) => {
        setValues({
            ...values,
            [props]: event.target.value
        })
    }
    const [disableSignUp, setDisableSignUp] = useState(false)
    const auth = getAuth();
    const signUpHandler = async (event) => {
        event.preventDefault()
        setDisableSignUp(true)
        try {
            const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
            console.log(user);
            //create user with mongo db now

            const uid = user.user.uid;
            console.log(uid);
            console.log(values);
            const article = { 
                firebaseUid: uid,
                name: values.name,
                email: values.email,
                phoneNumber: values.phoneNumber,
                age: values.age,
                gender: values.gender,
                instagramUsername: values.instagramUsername 
            };
            axios.post('http://localhost:3000/customer/new', article)
                .then(response => console.log(response))
                .catch(error => console.log(error));
                window.location.reload();
        } catch (e) {
            console.error(e)
        } finally {
            setDisableSignUp(false)
        }
    }
    return (
        <div className={classes.paper}>
            <Typography variant="h3">
                SecurePay
            </Typography>
            <Typography variant="h5" color="initial" style={{ marginTop: "2rem" }}>
                Customer Sign Up
            </Typography>
            <div className={classes.divider} />
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="name"
                            name="firstName"
                            variant="outlined"
                            value={values.name}
                            onChange={valueChangeHandler('name')}
                            required
                            fullWidth
                            id="firstName"
                            label="Full Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.email}
                            onChange={valueChangeHandler('email')}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.phoneNumber}
                            onChange={valueChangeHandler('phoneNumber')}
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.password}
                            onChange={valueChangeHandler('password')}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.age}
                            onChange={valueChangeHandler('age')}
                            id="age"
                            label="Age"
                            name="age"
                            autoComplete="age"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.gender}
                            onChange={valueChangeHandler('gender')}
                            id="gender"
                            label="gender"
                            name="Gender"
                            autoComplete="gender"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.instagramUsername}
                            onChange={valueChangeHandler('instagramUsername')}
                            id="instagramUsername"
                            label="instagramUsername"
                            name="Instagram Username"
                            autoComplete="instagramUsername"
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I accept the terms and conditions"
                        />
                    </Grid> */}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={signUpHandler}
                    className={classes.submit}
                >
                    SignUp
                </Button>
                <Grid container justifyContent="flex-end" className={classes.extra}>
                    <Grid item>
                        <Link onClick={setExistingHandler} color="primary" variant="body2" style={{cursor: "pointer"}}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}