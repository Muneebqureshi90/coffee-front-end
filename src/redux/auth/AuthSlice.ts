import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../config/ApiConfig";

// Define the type for the payload in signUpUser.fulfilled
interface SignUpUserFulfilledPayload {
    user: string; // Adjust the type based on your actual user data type
    token: string;
    message: string;
}

// Define the type for the payload in signUpUser.rejected
interface SignUpUserRejectedPayload {
    error: string; // Adjust the type based on the actual error data type
}

const initialState = {
    message: "",
    user: "",
    token: "",
    loading: false,
    error: ""
}
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
    // we all write a name in typePrefix what we want
    // 'signInUser', // The prefix for the generated action types


    'auth/signIn', // The prefix for the generated action types
    async (userData: any, thunkAPI) => {
        try {
            // Perform the asynchronous operation (e.g., make an API request to sign up the user)
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
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


// The createAsyncThunk function creates an object with the async thunk and its action creators.
// For example, if used in a Redux slice, you can include signUpUser as one of the reducers.

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Add a token for login not for signup
        addToken: (state, action: PayloadAction<string>) => {
            const storedToken = localStorage.getItem("token");
            state.token = storedToken || ""; // Use an empty string if the token is null
        },
        // Add a user for login not for signup
        // Add a user for login not for signup
        addUser: (state, action: PayloadAction<string>) => {
            const storedUser = localStorage.getItem("user");
            state.user = storedUser ? JSON.parse(storedUser) : null; // Parse the stored user string to an object
        },

        // Logout user
        // logout: (state, action: PayloadAction<string>) => {
        //     // state.token = null;
        //     // state.user = null;
        //     localStorage.clear();
        // },
        logout: (state, action: PayloadAction<string>) => {
            localStorage.clear();
        },

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
            }).addCase(signInUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserFulfilledPayload;
                state.user = payload.user;
                state.token = payload.token;
                state.message = payload.message; // Use payload.Message instead of payload.message

                // Store data in local storage
                localStorage.setItem('msg', payload.message);
                localStorage.setItem('user', JSON.stringify(payload.user)); // Assuming payload.user is an object
                localStorage.setItem('token', payload.token);

            })

            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as SignUpUserRejectedPayload;
                state.error = payload.error;
            });
    },
});

export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
