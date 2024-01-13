import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../state/auth/Action";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const LoginForm = () => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };

        console.log(userData);
        dispatch(login(userData)).then(() => {
            // Add your logic here after login
            navigate("/"); // Redirect to homepage after successful login
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            fullWidth
                            name="email"
                            autoComplete="email"
                        />
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
                            Login Here
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className={'justify-center flex-col items-center'}>
                <div className={'py-5 flex item-center'}>
                    <p>if you don't have an account ?</p>
                    <Button onClick={() => navigate("/register")} className={'ml-5'} size={'small'}>signUp</Button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
