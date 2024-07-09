
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
    const navigate = useNavigate();

    return (
        <Card className="max-w-lg mx-auto mt-10 m-5 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="text-center">
                <Typography variant="h4" component="h2" className="mb-6 text-center">
                    Payment Failed
                </Typography>
                <Typography variant="body1" className="mb-6">
                    Unfortunately, your payment was not successful. Please try again.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/checkout')}
                    className="w-full py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    Try Again
                </Button>
            </CardContent>
        </Card>
    );
};

export default PaymentFailure;
