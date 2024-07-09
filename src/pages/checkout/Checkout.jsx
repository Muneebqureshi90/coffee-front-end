import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, InputAdornment } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const navigate = useNavigate();
    // console.log(data.totalPrice);
    const [formValues, setFormValues] = useState({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        billingAddress: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { cardholderName, cardNumber, expiryDate, cvv, billingAddress, email } = formValues;


        if (!cardholderName || !cardNumber || !expiryDate || !cvv || !billingAddress || !email) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (cardNumber.length !== 16) {
            toast.error("Card number must be 16 digits.");
            return;
        }

        if (cvv.length !== 3) {
            toast.error("CVV must be 3 digits.");
            return;
        }


        const isPaymentSuccessful = Math.random() > 0.5;

        if (isPaymentSuccessful) {
            toast.success("Payment successful!");
            setTimeout(() => {
                navigate('/payment-success');
            }, 1500);
        } else {
            toast.error("Payment failed. Please try again.");
            setTimeout(() => {
                navigate('/payment-failure');
            }, 1500);
        }
    };

    return (
        <div>
            <ToastContainer />
            <Card className="max-w-lg mx-auto mt-10 m-5 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardContent>
                    <Typography variant="h4" component="h2" className="mb-6 text-center">
                        Payment Details
                    </Typography>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <TextField
                            label="Cardholder Name"
                            name="cardholderName"
                            variant="outlined"
                            fullWidth
                            value={formValues.cardholderName}
                            onChange={handleChange}
                            className="bg-white rounded-lg shadow-inner focus:outline-none focus:border-blue-500"
                        />
                        <TextField
                            label="Card Number"
                            name="cardNumber"
                            variant="outlined"
                            fullWidth
                            value={formValues.cardNumber}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CreditCardIcon className="mr-2" />
                                    </InputAdornment>
                                ),
                            }}
                            className="bg-white rounded-lg shadow-inner focus:outline-none focus:border-blue-500"
                        />
                        <div className="flex space-x-4">
                            <TextField
                                label="Expiry Date"
                                name="expiryDate"
                                variant="outlined"
                                fullWidth
                                value={formValues.expiryDate}
                                onChange={handleChange}
                                className="bg-white rounded-lg shadow-inner focus:outline-none focus:border-blue-500"
                            />
                            <TextField
                                label="CVV"
                                name="cvv"
                                variant="outlined"
                                fullWidth
                                value={formValues.cvv}
                                onChange={handleChange}
                                className="bg-white rounded-lg shadow-inner focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <TextField
                            label="Billing Address"
                            name="billingAddress"
                            variant="outlined"
                            fullWidth
                            value={formValues.billingAddress}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeIcon className="mr-2" />
                                    </InputAdornment>
                                ),
                            }}
                            className="bg-white rounded-lg shadow-inner focus:outline-none focus:border-blue-500"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            value={formValues.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon className="mr-2" />
                                    </InputAdornment>
                                ),
                            }}
                            className="bg-white rounded-lg shadow-inner focus:outline-none focus:border-blue-500"
                        />
                        <TextField
                            label="Total Amount"
                            variant="outlined"
                            fullWidth
                            // value={data && data.totalPrice ? `Rs ${data.totalPrice}` : ''}
                            value={ '579 Rs' }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AttachMoneyIcon className="mr-2" />
                                    </InputAdornment>
                                ),
                                readOnly: true
                            }}
                            className="bg-white rounded-lg shadow-inner focus:outline-none focus:border-blue-500"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="w-full py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            Pay Now
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Checkout;
