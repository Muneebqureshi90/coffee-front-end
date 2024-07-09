// ForgetPassword.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from '../../redux/auth/AuthSlice'; // Adjust the path to your auth file

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate for navigation in React Router v6
    const { loading = false, error = null, message = "" } = useSelector((state: any) => state.auth || {});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Dispatch forgetPassword action with email
            const actionResult = await dispatch<any>(forgetPassword({ email }));
            const data = actionResult.payload; // Extract the payload from the action result

            console.log('Password reset link sent successfully');
            // Redirect to a confirmation page or show a success message
            navigate('/password-reset-sent'); // Use navigate function to navigate

        } catch (err: any) {
            console.error('Error sending password reset link:', err);
            // Handle error, show an error message to the user
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-semibold mb-6">Forget Password</h2>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
            </form>
        </div>
    );
};

export default ForgetPassword;
