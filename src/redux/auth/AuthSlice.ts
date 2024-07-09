import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../config/ApiConfig";

// Define the type for the payload in signUpUser.fulfilled
interface SignUpUserFulfilledPayload {
    user: string; // Adjust the type based on your actual user data type
    token: string;
    message: string;
}
interface ForgetPasswordRequest {
    email: string; // Adjust based on your API response
}

interface ForgetPasswordError {
    error: string; // Adjust based on your API error response
}
// Define the type for the payload in signUpUser.rejected
interface SignUpUserRejectedPayload {
    error: string; // Adjust the type based on the actual error data type
}
interface GoogleOAuthResponse {
    accessToken: string;
    // Other relevant properties...
}

// Define a type/interface for the GitHub OAuth2 response
interface GitHubOAuthResponse {
    code: string;
    // Other relevant properties...
}
// Define the type for the state
interface UserState {
    message: string;
    user: any; // Adjust this based on your actual user data type
    userId: string; // Ensure userId is of type string // Adjust this based on your actual user ID type
    token: string;
    loading: boolean;
    error: string | null;

}
interface AuthState {
    loading: boolean;
    error: string | null;
    message: string;
    user: any; // Adjust based on your actual user data type
    userId: string; // Ensure userId is of type string
    token: string;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    message: "",
    user: null, // Adjust based on your actual initial user state
    userId: "", // Ensure this is initialized properly
    token: "",
};


// Define an asynchronous thunk for signing up a user.
// This thunk will automatically generate three action creators:
// - signUpUser.pending: Triggered when the asynchronous operation starts.
// - signUpUser.fulfilled: Triggered when the asynchronous operation is successful.
// - signUpUser.rejected: Triggered when the asynchronous operation fails.

export const signUpUser = createAsyncThunk(
    // we all write a name in typePrefix what we want
    // 'signUpUser', // The prefix for the generated action types


    'auth/signUp', // The prefix for the generated action types
    async (userData: any, thunkAPI) => {
        try {
            // Perform the asynchronous operation (e.g., make an API request to sign up the user)
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                // Handle non-successful responses (e.g., server error)
                const errorData = await response.json();
                return thunkAPI.rejectWithValue({error: errorData.message});
            }

            // Return the data you want to include in the signUpUser.fulfilled action
            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            // Handle errors and return the data you want to include in the signUpUser.rejected action
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);


// Login

export const signInUser = createAsyncThunk(
    'auth/signIn',
    async (userData: any, thunkAPI) => {
        try {
            // Log the user data before making the API request
            // console.log('User Data Before API Request:', userData);

            // Perform the asynchronous operation (e.g., make an API request to sign in the user)
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: userData.email, password: userData.password }),
            });

            if (!response.ok) {
                // Handle non-successful responses (e.g., server error)
                const errorData = await response.json();
                return thunkAPI.rejectWithValue({ error: errorData.message });
            }

            // Return the data you want to include in the signInUser.fulfilled action
            const responseData = await response.json();
            // console.log('Login Response Data:', responseData); // Log the actual data

            // Log the user data after the API request (userData still holds the initial input)
            console.log('User Data After API Request:', userData);

            // Store data in local storage
            localStorage.setItem('msg', responseData.message);
            localStorage.setItem('user', JSON.stringify(responseData.user));
            localStorage.setItem('token', responseData.token);

            // Log the stored data
            console.log('Stored Data:', localStorage.getItem('user'), localStorage.getItem('token'));

            return responseData;
        } catch (error: any) {
            // Handle errors and return the data you want to include in the signInUser.rejected action
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);




// Define an asynchronous thunk for handling Google OAuth2 response
export const googleOAuthSignIn = createAsyncThunk(
    'auth/googleOAuthSignIn',
    async (response: GoogleOAuthResponse, thunkAPI) => {
        try {
            // Process the Google OAuth2 response data and send it to the server for validation
            // Example: Send the response.accessToken to your server and await the user data in return
            // ...
            const userData = await fetch(`${API_BASE_URL}/login/oauth2/code/{provider}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken: response.accessToken }),
            });
            const user = await userData.json();
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Define an asynchronous thunk for handling GitHub OAuth2 response
export const githubOAuthSignIn = createAsyncThunk(
    'auth/githubOAuthSignIn',
    async (response: GitHubOAuthResponse, thunkAPI) => {
        try {
            // Process the GitHub OAuth2 response data and send it to the server for validation
            // Example: Send the response.code to your server and await the user data in return
            // ...
            const userData = await fetch('YOUR_SERVER_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: response.code }),
            });
            const user = await userData.json();
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
export const forgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async (data: ForgetPasswordRequest, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/request`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue({ error: errorData.message });
            }

            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// The createAsyncThunk function creates an object with the async thunk and its action creators.
// For example, if used in a Redux slice, you can include signUpUser as one of the reducers.

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setUserId(state, action: PayloadAction<string>) {
            state.userId = action.payload;
        },
        // Add a token for login not for signup
        addToken: (state, action: PayloadAction<string>) => {
            const storedToken = localStorage.getItem("token");
            state.token = storedToken || ""; // Use an empty string if the token is null
        },

        addUser: (state, action: PayloadAction<string>) => {
            const storedUser = localStorage.getItem("user");
            // state.user = storedUser ? JSON.parse(storedUser) : null;
            state.user = storedUser ? JSON.parse(storedUser) : null;
        },

        // Logout user
        // authSlice
        logout: (state) => {
            localStorage.clear();
        },

        // logout: (state, action: PayloadAction<string>) => {
        //     localStorage.clear();
        //
        // },

    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserFulfilledPayload;
                state.user = payload.user;
                state.token = payload.token;
                state.message = payload.message;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserRejectedPayload;
                state.error = payload.error;
            })
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserFulfilledPayload;
                state.user = payload.user;
                state.token = payload.token;
                state.message = payload.message;
                localStorage.setItem('msg', payload.message);
                localStorage.setItem('user', JSON.stringify(payload.user));
                localStorage.setItem('token', payload.token);
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserRejectedPayload;
                state.error = payload.error;
            })
            // Google OAuth
            .addCase(googleOAuthSignIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(googleOAuthSignIn.fulfilled, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserFulfilledPayload;

                state.user = payload.user;
                state.token = payload.token;
                state.message = payload.message;

                // Handle setting token and user details based on the returned response data
            })
            .addCase(googleOAuthSignIn.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserRejectedPayload;
                state.error = payload.error;
            })
            // GitHub OAuth
            .addCase(githubOAuthSignIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(githubOAuthSignIn.fulfilled, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserFulfilledPayload;

                state.user = payload.user;
                state.token = payload.token;
                state.message = payload.message;
                // Handle setting token and user details based on the returned response data
            })
            .addCase(githubOAuthSignIn.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserRejectedPayload;
                state.error = payload.error;
            })
            .addCase(forgetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message; // Adjust based on your response structure
            })

            .addCase(forgetPassword.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as ForgetPasswordError;
                state.error = payload.error || 'Failed to send reset email.';
            });

    },
});

export const {addToken, addUser, logout} = authSlice.actions;
export const selectUserId = (state: { auth?: UserState }) => state.auth?.userId ?? "";


export default authSlice.reducer;




