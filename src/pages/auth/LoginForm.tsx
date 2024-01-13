import React, {useState} from 'react';
import {Container, Grid, Button, Checkbox, Link, Typography, InputAdornment, IconButton} from '@mui/material';
import {TextField} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GmailIcon from '@mui/icons-material/Mail';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {Visibility, VisibilityOff} from "@mui/icons-material";

import {toast} from "react-toastify";

import {AxiosResponse} from "axios";
import {response} from "express";
import {signInUser} from "../../redux/auth/AuthSlice";  // Assuming you have a Gmail icon in MUI

interface FormData {
    email: string;
    password: string;

}


function LoginForm() {

    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const navigateToSignup = () => {
        navigate('/login');
    };
    const [formData, setFormData] = useState({

        email: '',
        password: '',

    });

    const [errors, setErrors] = useState({

        email: '',
        password: '',

        serverError: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = (userData: FormData) => {
        const newErrors = {...errors};

        if (!userData.email.trim()) {
            newErrors.email = 'Email is required!!';
        } else {
            newErrors.email = '';
        }

        if (!userData.password.trim()) {
            newErrors.password = 'Password is required!!';
        } else {
            newErrors.password = '';
        }

        newErrors.serverError = '';
        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        // Validate the form with the latest form data
        const isFormValid = validateForm(formData);
        try {
            if (isFormValid) {
                // Dispatch the signInUser action
                const action = await dispatch(signInUser(formData));

                // Check if the action was successful
                if (signInUser.fulfilled.match(action)) {
                    // Continue with your logic for a successful login
                    // Show a success toast with the message
                    toast.success('Login successful!');

                    // Navigate or perform other actions as needed
                    navigate('/dashboard');
                } else {
                    // Handle invalid form submission or other errors
                    toast.error('Incorrect data or something went wrong.');
                }
            } else {
                // Handle invalid form submission
                toast.error('Please fill in all required fields.');
            }
            console.log(response);
        }catch (error: any) {
            // Explicitly type the 'error' variable as 'any' or use type guards
            console.error(error);

            if (error.response) {
                if (error.response.status === 401) {
                    toast.error('Incorrect data');
                } else if (error.response.status === 404 || error.response.status === 400) {
                    toast.error(error.response.data.message || 'Something went wrong on the server');
                } else {
                    // Set serverError on other server errors
                    setErrors({...errors, serverError: 'Something went wrong on the server'});

                    console.error('Error:', error);
                    console.error('Response:', error.response);
                }
            } else {
                // Handle non-response errors
                toast.error('Something went wrong. Please try again.');
            }

            // Perform actions like showing error messages
        }
    };
    return (
        <Container maxWidth="xl" className="p-3 my-5 mt-50">
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={10} md={6}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                             className="img-fluid" alt="Phone image"/>
                    </Grid>
                    <Grid item xs={8} md={6} className={""}>
                        <TextField label='Email address' variant='outlined' fullWidth margin='normal' size="medium"/>
                        {errors.email && <div className="invalid-feedback text-red-900">{errors.email}</div>}
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {errors.password && <div className="invalid-feedback text-red-900">{errors.password}</div>}

                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <Checkbox name='flexCheck' color='primary'/>
                            <Link href="!#">Forgot password?</Link>
                        </div>
                        <Button className="mb-4 w-100" variant="contained" size="large" type="submit">
                            Sign in
                        </Button>
                        <div className="divider d-flex align-items-center my-4">
                            <Typography className="text-center fw-bold mx-3 mb-0">OR</Typography>
                        </div>
                        <div className="sm:flex sm:flex-col sm:space-y-4">
                            <Button className="mb-4 w-full " variant="contained" size="large"
                                    style={{backgroundColor: '#3b5998'}}>
                                <FacebookIcon className="mx-2"/>
                                Continue with Facebook
                            </Button>
                            <Button className="mb-4 w-full" variant="contained" size="large"
                                    style={{backgroundColor: '#dd4b39'}}>
                                <GmailIcon className="mx-2"/>
                                Continue with Gmail
                            </Button>
                        </div>

                        <div className="mt-2">
                            <Typography className="text-center">
                                If you don't have an account?{' '}
                                <Link href="#" variant="body2" onClick={navigateToSignup}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default LoginForm;
