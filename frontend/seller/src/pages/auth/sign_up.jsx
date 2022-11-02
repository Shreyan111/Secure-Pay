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
        email: '',
        password: '',
        instagramUsername: '',
        panNo: '',
        storeName: '',
        storeDescription: '',
        revenue: '',
        address: {
            address1:'',
            city:'',
            state:'',
            pincode:''
        }
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
                username: values.name,
                email: values.email,
                phoneNumber: values.phoneNumber,
                instagramUsername: values.instagramUsername,
                panNo: values.panNo,
                storeName: values.storeName,
                storeDescription: values.storeDescription,
                revenue: values.revenue,
                address: values.address
            };
            axios.post('http://localhost:3000/seller/new', article)
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
            <Typography variant="h5" color="text.primary" style={{ marginTop: "2rem" }}>
                Seller Sign Up
            </Typography>
            <div className={classes.divider} />
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            autoComplete="fname"
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
                    <Grid item xs={6}>
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
                            value={values.password}
                            onChange={valueChangeHandler('password')}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.instagramUsername}
                            onChange={valueChangeHandler('instagramUsername')}
                            name="instagramUsername"
                            label="Instagram Username"
                            id="instagramUsername"
                            autoComplete="instagramUsername"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.panNo}
                            onChange={valueChangeHandler('panNo')}
                            name="panNo"
                            label="PAN Number"
                            id="panNo"
                            autoComplete="panNo"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.storeName}
                            onChange={valueChangeHandler('storeName')}
                            name="storeName"
                            label="Store Name"
                            id="storeName"
                            autoComplete="storeName"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.storeDescription}
                            onChange={valueChangeHandler('storeDescription')}
                            name="storeDescription"
                            label="Store Description"
                            id="storeDescription"
                            autoComplete="storeDescription"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.revenue}
                            onChange={valueChangeHandler('revenue')}
                            name="revenue"
                            label="Revenue"
                            id="revenue"
                            autoComplete="revenue"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.address1}
                            onChange={valueChangeHandler('address1')}
                            name="address1"
                            label="Address"
                            id="address1"
                            autoComplete="address1"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.city}
                            onChange={valueChangeHandler('city')}
                            name="city"
                            label="City"
                            id="city"
                            autoComplete="city"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.state}
                            onChange={valueChangeHandler('state')}
                            name="state"
                            label="State"
                            id="state"
                            autoComplete="state"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={values.pincode}
                            onChange={valueChangeHandler('pincode')}
                            name="pincode"
                            label="Pincode"
                            id="pincode"
                            autoComplete="pincode"
                            type="number"
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
                        <Link onClick={setExistingHandler} color="secondary" variant="body2" style={{cursor: "pointer"}}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}