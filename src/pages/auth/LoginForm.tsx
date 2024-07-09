import React, {useState} from 'react';
import {Container, Grid, Button, Checkbox, Link, Typography, InputAdornment, IconButton} from '@mui/material';
import {TextField} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GmailIcon from '@mui/icons-material/Mail';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Google as GoogleIcon } from '@mui/icons-material'; // Import the Google icon
import {toast} from 'react-toastify';
import {signInUser} from '../../redux/auth/AuthSlice';

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
    const handleGoogleSignIn = () => {
        // Redirect to the Google sign-in endpoint on the backend
        // window.location.href = 'http://localhost:8080/login/oauth2/code/google';
        window.location.href = 'https://accounts.google.com/o/oauth2/auth';



        // const googleAuthEndpoint = 'https://accounts.google.com/o/oauth2/auth';
        //
        // // Construct the URL with the required parameters
        // const redirectUri = 'http://localhost:8080/auth/login/oauth2/code/google'; // Update with your actual redirect URI
        // const clientId = '490947273977-ibe1vr2ai0uk407cc4g8nkec277roopc.apps.googleusercontent.com'; // Replace with your actual Google client ID
        // const scope = 'openid profile email'; // Define the required scopes
        // const responseType = 'code';
        //
        // const googleAuthUrl = `${googleAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
        //
        // console.log(googleAuthEndpoint);
        // console.log(googleAuthUrl);

        // Redirect to the Google sign-in URL
        // window.location.href = googleAuthUrl;

    };

    const handleGitHubSignIn = () => {
        // Redirect to the GitHub sign-in endpoint on the backend
        // Implement this when you set up GitHub authentication in your Spring Boot backend
        window.location.href = 'http://localhost:8080/login/oauth2/code/github';
        // window.location.href = 'https://github.com/login/oauth/authorize';
    };
    const navigateToSignup = () => {
        navigate('/signup'); // Assuming '/signup' is the correct route
    };

    const [formData, setFormData] = useState<FormData>({
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
        // console.log('Form Data:', formData);
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
                    navigate('/');
                } else {
                    // Handle invalid form submission or other errors
                    if (action.payload) {
                        const errorData = action.payload as any;

                        if (errorData.error && errorData.error === 'Invalid Username or Password') {
                            // The server responded with a 500 error, and the error message indicates
                            // that either the username or password is incorrect.
                            toast.error('Incorrect email or password.');
                        } else {
                            // Handle other errors (e.g., validation errors)
                            toast.error('An error occurred. Please try again.');
                        }

                        // You can also log detailed error information if needed
                        console.error('Error:', errorData);
                    } else {
                        // Handle the case where action.payload is undefined
                        toast.error('An unexpected error occurred. Please try again.');
                        console.error('Unexpected payload structure:', action.payload);
                    }
                }

            } else {
                // Handle invalid form submission
                toast.error('Please fill in all required fields.');
            }
        } catch (error: any) {
            // Handle errors
            console.error(error);

            if (error.response) {
                const contentType = error.response.headers.get('Content-Type');

                if (contentType && contentType.includes('application/json')) {
                    // JSON response
                    if (error.response.status === 401) {
                        // Handle incorrect email/password combination
                        try {
                            const errorData = await error.response.json();
                            console.error(`Incorrect data: ${errorData.message}`);
                            toast.error('Incorrect email or password.');
                        } catch (jsonError) {
                            console.error('Error parsing JSON:', jsonError);
                            toast.error('An unexpected error occurred. Please try again.');
                        }
                    } else if (error.response.status === 500) {
                        try {
                            const errorData = await error.response.json();

                            // Check if the response body is a valid JSON
                            if (errorData && errorData.error === 'Invalid Username or Password') {
                                // The server responded with a 500 error, and the error message indicates
                                // that either the username or password is incorrect.
                                toast.error('Incorrect email or password.');
                            } else {
                                // Handle other errors (e.g., validation errors)
                                toast.error('An error occurred. Please try again.');
                            }
                        } catch (jsonError) {
                            console.error('Error parsing JSON:', jsonError);
                            toast.error('An unexpected error occurred. Please try again.');
                        }
                    } else if (error.response.status === 404 || error.response.status === 400) {
                        // Handle other server errors
                        try {
                            const errorData = await error.response.json();
                            toast.error(`Server error: ${errorData.message || 'Something went wrong on the server'}`);
                        } catch (jsonError) {
                            console.error('Error parsing JSON:', jsonError);
                            toast.error('An unexpected error occurred. Please try again.');
                        }
                    } else {
                        // Set serverError on other server errors
                        setErrors({...errors, serverError: 'Something went wrong on the server'});

                        console.error('Error:', error);
                        console.error('Response:', error.response);
                    }
                } else {
                    // Non-JSON response (possibly HTML error page)
                    console.error('Non-JSON response:', error.response);

                    // Handle it as needed (e.g., display a generic error message)
                    toast.error('An unexpected error occurred. Please try again.');
                }
            } else {
                // Handle non-response errors
                toast.error('Something went wrong. Please try again.');
            }
        }

    }
    const handleForgotPassword = () => {
        navigate('/forget');
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
                        <TextField
                            label='Email address'
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant='outlined'
                            fullWidth
                            name="email"
                            margin='normal'
                            size="medium"
                        />
                        {errors.email && <div className="invalid-feedback text-red-900">{errors.email}</div>}
                        <TextField
                            fullWidth
                            margin="normal"
                            variant='outlined'
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
                            <button onClick={handleForgotPassword} >Forgot password?</button>
                        </div>
                        <Button className="mb-4 w-100" variant="contained" size="large" type="submit">
                            Sign in
                        </Button>
                        <div className="divider d-flex align-items-center my-4">
                            <Typography className="text-center fw-bold mx-3 mb-0">OR</Typography>
                        </div>
                        <div className="sm:flex sm:flex-col sm:space-y-4">
                            {/*<Button className="mb-4 w-full " variant="contained" size="large"*/}
                            {/*        style={{backgroundColor: '#3b5998'}}>*/}
                            {/*    <FacebookIcon className="mx-2"/>*/}
                            {/*    Continue with Facebook*/}
                            {/*</Button>*/}
                            {/*<Button className="mb-4 w-full" variant="contained" size="large"*/}
                            {/*        style={{backgroundColor: '#dd4b39'}}>*/}
                            {/*    <GmailIcon className="mx-2"/>*/}
                            {/*    Continue with Gmail*/}
                            {/*</Button>*/}
                            <Button
                                className="mb-4 w-full"
                                variant="contained"
                                size="large"
                                style={{backgroundColor: '#4285F4', color: '#FFFFFF'}}
                                onClick={handleGoogleSignIn}
                            >
                                <GoogleIcon className="mx-2"/>
                                Continue with Google
                            </Button>
                            <Button
                                className="mb-4 w-full"
                                variant="contained"
                                size="large"
                                style={{backgroundColor: '#333'}}
                                onClick={handleGitHubSignIn}
                            >
                                <GitHubIcon className="mx-2"/>
                                Continue with GitHub
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
