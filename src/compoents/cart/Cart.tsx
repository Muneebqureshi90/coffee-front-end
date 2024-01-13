import React from 'react';
import { Divider } from '@mui/material';
import Button from '../../layouts/button/Button';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
    const navigate = useNavigate();

    const handleCheckOutClick = () => {
        navigate('/checkout');
    };

    return (
        <div className="lg:grid grid-cols-3 m-5 p-3">
            <div className="col-span-2">
                {[1, 1, 1, 1, 1, 1].map((item, index) => (
                    <CartItem key={index} />
                ))}
            </div>

            <div className="col-span-1 shadow-2xl rounded border-2 px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
                <div className="">
                    <h2 className="font-semibold opacity-50 uppercase pb-5">Price Details</h2>
                </div>

                <Divider />

                <div className="pb-2">
                    <div className="flex justify-between font-semibold mt-3">
                        <p>Quantity</p>
                        <p>3</p>
                    </div>
                    <div className="flex justify-between font-semibold mt-3">
                        <p>Price</p>
                        <p>2200Rs</p>
                    </div>
                    <div className="flex justify-between font-semibold mt-3">
                        <p>Discount</p>
                        <p className="text-green-600">700Rs</p>
                    </div>
                    <div className="flex justify-between font-semibold mt-3">
                        <p>Delivery</p>
                        <p className="text-green-600">Free</p>
                    </div>
                </div>

                <Divider />

                <div>
                    <div className="flex justify-between font-semibold mt-4 pb-5">
                        <p>Total Price</p>
                        <p>4500</p>
                    </div>
                </div>

                <Divider />

                <div className="mt-3 flex justify-center">
                    <div className="w-full">
                        <Button title="CheckOut" onClick={handleCheckOutClick} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
