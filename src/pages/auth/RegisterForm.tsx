import React, {useState} from 'react';
import {TextField, Button, Typography, Link, InputAdornment, IconButton} from '@mui/material';
import {Container, Grid} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import {useNavigate} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {signUpUser} from "../../redux/auth/AuthSlice";

import {Visibility, VisibilityOff} from "@mui/icons-material";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
}

function RegisterForm() {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const navigateToLogin = () => {
        navigate('/login');
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',

    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
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

        // Example validation for each field
        if (!userData.firstName.trim()) {
            newErrors.firstName = 'First Name is required!!';
        } else {
            newErrors.firstName = '';
        }

        if (!userData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required!!';
        } else {
            newErrors.lastName = '';
        }

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

        if (!userData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone Number is required!!';
        } else {
            newErrors.phoneNumber = '';
        }

        if (!userData.streetAddress.trim()) {
            newErrors.streetAddress = 'Street Address is required!!';
        } else {
            newErrors.streetAddress = '';
        }

        if (!userData.city.trim()) {
            newErrors.city = 'City is required!!';
        } else {
            newErrors.city = '';
        }

        if (!userData.state.trim()) {
            newErrors.state = 'State is required!!';
        } else {
            newErrors.state = '';
        }

        if (!userData.zipCode.trim()) {
            console.log(errors)
            newErrors.zipCode = 'Zip Code is required!!';
        } else {
            newErrors.zipCode = '';
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
            // Dispatch the registerUser action with form data
            const response = await dispatch(signUpUser(formData));

            // Check if the form is valid before showing success message
            if (isFormValid) {
                // Continue with your logic for a valid form
                // Show a success toast with the message
                toast.success('Registration successful! Please check your email for a verification link.');

                // Navigate or perform other actions as needed
            } else {
                // Handle invalid form submission
                toast.error('Please fill in all required fields.');
                console.log(errors);
            }

            console.log(response);
        } catch (error: any) {
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
                        <img
                            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                            className="img-fluid"
                            alt="Phone image"
                        />
                    </Grid>
                    <Grid item xs={8} md={6} className={''}>
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            label="First name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName &&
                            <div className="invalid-feedback text-red text-red-900">{errors.firstName}</div>}
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            label="Last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <div className="invalid-feedback text-red-900">{errors.lastName}</div>}
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            label="Email address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
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
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            label="Phone number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber &&
                            <div className="invalid-feedback text-red-900">{errors.phoneNumber}</div>}
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            label="Street address"
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleChange}
                        />
                        {errors.streetAddress &&
                            <div className="invalid-feedback text-red-900">{errors.streetAddress}</div>}
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <div className="invalid-feedback text-red-900">{errors.city}</div>}
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                        {errors.state && <div className="invalid-feedback text-red-900">{errors.state}</div>}
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            label="Zip code"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                        />
                        {errors.zipCode && <div className="invalid-feedback text-red-900">{errors.zipCode}</div>}


                        {/* Display server error message */}
                        {errors.serverError && (
                            <div className="alert alert-danger mt-3">{errors.serverError}</div>
                        )}

                        <Button
                            className="mb-4 w-100"
                            variant="contained"
                            size="large"
                            type="submit"
                        >
                            Sign up
                        </Button>

                        <div className="divider d-flex align-items-center my-4">
                            <Typography className="text-center fw-bold mx-3 mb-0">OR</Typography>
                        </div>

                        <div className="sm:flex sm:flex-col sm:space-y-4">
                            <Button
                                className="mb-4 w-full"
                                variant="contained"
                                size="large"
                                style={{backgroundColor: '#3b5998'}}
                            >
                                <FacebookIcon className="mx-2"/>
                                Continue with Facebook
                            </Button>
                            <Button
                                className="mb-4 mt-3 w-full"
                                variant="contained"
                                size="large"
                                style={{backgroundColor: '#55acee'}}
                            >
                                <TwitterIcon className="mx-2"/>
                                Continue with Twitter
                            </Button>
                            <Button
                                className="mb-4 mt-3 w-full"
                                variant="contained"
                                size="large"
                                style={{backgroundColor: '#4285F4'}}
                            >
                                <GoogleIcon className="mx-2"/>
                                Continue with Google
                            </Button>
                            <Button
                                className="mb-4 mt-3 w-full"
                                variant="contained"
                                size="large"
                                style={{backgroundColor: '#000000'}}
                            >
                                <GitHubIcon className="mx-2"/>
                                Continue with GitHub
                            </Button>
                        </div>

                        <div className="mt-2">
                            <Typography className="text-center">
                                If you already have an account?{' '}
                                <Link href="#" variant="body2" onClick={navigateToLogin}>
                                    Login
                                </Link>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default RegisterForm;
