import React from 'react';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CartItem = () => {
    return (
        <div className="shadow-2xl rounded-lg p-5 border flex items-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32">
                <img
                    className="w-full h-full rounded-lg"
                    src={require('../../images/product1.jpg')}
                    alt="Description of the image"
                />
            </div>
            <div className="ml-5 space-y-1">
                <p className="font-semibold">Women Fit and Flare Yellow Dress</p>
                <p className="opacity-70">Size: L, Color: Yellow</p>
                <p className="opacity-70 mt-2">Seller: Janasya</p>
                <div className="flex space-x-5 items-center pt-5 text-gray-900 mt-6">
                    <p className="font-semibold opacity-80">2200RS</p>
                    <p className="opacity-60 line-through">4500RS</p>
                    <p className="text-green-600 font-semibold">55% off</p>
                </div>
                <div className="lg:flex items-center lg:space-x-10 pt-4">
                    <div className="flex items-center space-x-3">
                        <IconButton sx={{ color: 'red' }}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <span className="py-1 border px-1 rounded-sm">3</span>
                        <IconButton sx={{ color: 'green' }}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                        <div>
                            <Button variant="outlined">Remove</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
