// import React, {useEffect} from "react";
// import {Grid, TextField, Button} from "@mui/material";
// import {Navigate, useNavigate} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {getUser, register} from "../../state/auth/Action";
// import {ThunkDispatch} from "redux-thunk";
// import {Action} from "redux";
//
//
// interface AuthState {
//     jwt: string;
//     // Other properties of your auth state
// }
// const RegisterForm = () => {
//
//
//     const navigate = useNavigate();
//     const dispatch = useDispatch<ThunkDispatch<{}, {}, Action>>(); // Specify ThunkDispatch type
//     const jwt=localStorage.getItem("jwt");
//     const { auth } = useSelector((store: { auth: AuthState }) => store);
//
//
//     useEffect(() => {
//         const token = localStorage.getItem('jwt');
//         if (token) {
//             dispatch(getUser());
//         }
//     }, [jwt,auth.jwt]);
//
//
//     // useEffect(() => {
//     //
//     // }, []);
//
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//
//         const userData = {
//             firstName: data.get("firstName"),
//             lastName: data.get("lastName"),
//             email: data.get("email"),
//             password: data.get("password"),
//             phoneNumber: data.get("phoneNumber"),
//         };
//
//         dispatch(register(userData));
//
//         console.log(userData);
//         // Add your form submission logic here
//     };
//
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             required
//                             id="firstName"
//                             label="First Name"
//                             fullWidth
//                             name="firstName"
//                             autoComplete="given-name"
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             required
//                             id="lastName"
//                             label="Last Name"
//                             fullWidth
//                             name="lastName"
//                             autoComplete="family-name"
//                         />
//                     </Grid>
//
//                     <Grid item xs={12}>
//                         <TextField
//                             required
//                             id="email"
//                             label="Email"
//                             fullWidth
//                             name="email"
//                             autoComplete="email"
//                         />
//                     </Grid>
//
//                     <Grid item xs={12}>
//                         <TextField
//                             required
//                             id="password"
//                             label="Password"
//                             fullWidth
//                             name="password"
//                             type="password"
//                         />
//                     </Grid>
//
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             required
//                             id="phoneNumber"
//                             label="Phone Number"
//                             fullWidth
//                             name="phoneNumber"
//                             autoComplete="tel"
//                         />
//                     </Grid>
//
//                     <Grid item xs={12}>
//                         <Button
//                             sx={{
//                                 width: "100%",
//                                 backgroundColor: "grey",
//                                 padding: ".8rem 0",
//                                 "&:hover": {
//                                     backgroundColor: "black",
//                                 },
//                             }}
//                             variant="contained"
//                             type="submit"
//                         >
//                             Register Here
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//
//             <div className={'justify-center flex-col items-center'}>
//                 <div className={'py-5 flex item-center'}>
//                     <p>If you already have an account?</p>
//                     <Button
//                         onClick={() => navigate("/login")}
//                         className={'ml-5'}
//                         size={'small'}
//                     >
//                         Login
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default RegisterForm;


import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../state/auth/Action";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { toast } from "react-toastify";
import {API_BASE_URL} from "../config/ApiConfig";
import axios from "axios";

interface AuthState {
    jwt: string;
    // Other properties of your auth state
}

const RegisterForm = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch<ThunkDispatch<{}, {}, Action>>(); // Specify ThunkDispatch type
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((store: { auth: AuthState }) => store);

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const [error, setError] = useState(""); // To store error message from the backend
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            dispatch(getUser());
        }
    }, [jwt, auth.jwt]);

    const validateForm = (userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
    }) => {
        const newErrors = { ...errors };

        if (!userData.firstName) {
            newErrors.firstName = "First Name is required";
        } else {
            newErrors.firstName = "";
        }

        if (!userData.lastName) {
            newErrors.lastName = "Last Name is required";
        } else {
            newErrors.lastName = "";
        }

        if (!userData.email) {
            newErrors.email = "Email is required";
        } else {
            newErrors.email = "";
        }

        if (!userData.password) {
            newErrors.password = "Password is required";
        } else {
            newErrors.password = "";
        }

        if (!userData.phoneNumber) {
            newErrors.phoneNumber = "Phone Number is required";
        } else {
            newErrors.phoneNumber = "";
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === "");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            firstName: data.get("firstName")?.toString() || "",
            lastName: data.get("lastName")?.toString() || "",
            email: data.get("email")?.toString() || "",
            password: data.get("password")?.toString() || "",
            phoneNumber: data.get("phoneNumber")?.toString() || "",
        };

        if (validateForm(userData)) {
            try {
                const response1 = await dispatch(register(userData)); // Corrected parentheses
                console.log("Registration Response:", response1);

                const response2 = await axios.post(`${API_BASE_URL}/auth/register`, userData);
                console.log("Response from Registration API:", response2);

                if (response2 && response2.data && response2.data.error) {
                    console.log("Registration Failed - Error Message:", response2.data.error);
                    setError(response2.data.error);
                    toast.error(response2.data.error);
                } else {
                    console.log("Registration Failed - Unexpected Response:", response2);
                    // setError("Registration failed. Please check your data.");
                    toast.error("Registration failed. Please check your data.");
                }
            } catch (error) {
                console.error("Registration Error:", error);
                setError("An error occurred. Please try again later.");
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            label="First Name"
                            fullWidth
                            name="firstName"
                            autoComplete="given-name"
                        />
                        {errors.firstName && (
                            <div className="invalid-feedback">{errors.firstName}</div>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            label="Last Name"
                            fullWidth
                            name="lastName"
                            autoComplete="family-name"
                        />
                        {errors.lastName && (
                            <div className="invalid-feedback">{errors.lastName}</div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            fullWidth
                            name="email"
                            autoComplete="email"
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            label="Password"
                            fullWidth
                            name="password"
                            type="password"
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="phoneNumber"
                            label="Phone Number"
                            fullWidth
                            name="phoneNumber"
                            autoComplete="tel"
                        />
                        {errors.phoneNumber && (
                            <div className="invalid-feedback">{errors.phoneNumber}</div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            sx={{
                                width: "100%",
                                backgroundColor: "grey",
                                padding: ".8rem 0",
                                "&:hover": {
                                    backgroundColor: "black",
                                },
                            }}
                            variant="contained"
                            type="submit"
                        >
                            Register Here
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className={"justify-center flex-col items-center"}>
                <div className={"py-5 flex item-center"}>
                    <p>If you already have an account?</p>
                    <Button onClick={() => navigate("/login")} className={"ml-5"} size={"small"}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
