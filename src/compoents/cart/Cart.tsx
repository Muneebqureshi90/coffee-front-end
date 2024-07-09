import React, { useState } from 'react';
import { Divider } from '@mui/material';
import Button from '../../layouts/button/Button';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { selectSelectedItems } from '../../redux/cartItem/cartItemSlice';
import image1 from '../../images/menu1.jpg';
import image2 from '../../images/menu2.jpg';
import image3 from '../../images/menu3.jpg';
import image4 from '../../images/menu4.jpg';

const Cart = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(selectSelectedItems);

    const [data, setData] = useState({
        quantity: 11,
        price: 429,
        discount: 600,
        delivery: 150,
        totalPrice: 579
    });

    const items = [
        {
            id: 1,
            image: image1,
            name: 'Black Coffee',
            price: 28,
            discountPrice: 10,
            discount: 55,
            initialQuantity: 3
        },
        {
            id: 2,
            image: image2,
            name: 'Turkish Coffee',
            price: 190,
            discountPrice: 180,
            discount: 18,
            initialQuantity: 2
        },
        {
            id: 3,
            image: image3,
            name: 'Cappuccino',
            price: 28,
            discountPrice: 10,
            discount: 44,
            initialQuantity: 3
        },
        {
            id: 4,
            image: image4,
            name: 'Masala Chai',
            price: 13.99,
            discountPrice: 3,
            discount: 80,
            initialQuantity: 3
        },
        // Add more items as needed
    ];

    const handleCheckOutClick = () => {

        navigate('/checkout', { state: { data } });
    };

    const handleRemoveItem = (itemId: number) => {
        // Remove item from cartItems state
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        // Optionally, update cart state in Redux or local state
        console.log(`Item ${itemId} removed from cart`);
    };

    return (
        <div className="lg:grid grid-cols-3 m-5 p-3">
            <div className="col-span-2">
                {items.map(item => (
                    <CartItem
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        discountPrice={item.discountPrice}
                        price={item.price}
                        discount={item.discount}
                        initialQuantity={item.initialQuantity}
                        onRemove={handleRemoveItem} // Pass the remove function to CartItem
                    />
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
                        <p>{data.quantity}</p>
                    </div>
                    <div className="flex justify-between font-semibold mt-3">
                        <p>Price</p>
                        <p>{data.price} Rs</p>
                    </div>
                    <div className="flex justify-between font-semibold mt-3">
                        <p>Discount</p>
                        <p className="text-green-600">{data.discount} Rs</p>
                    </div>
                    <div className="flex justify-between font-semibold mt-3">
                        <p>Delivery</p>
                        <p className="text-green-600">{data.delivery} Rs</p>
                    </div>
                </div>

                <Divider />

                <div>
                    <div className="flex justify-between font-semibold mt-4 pb-5">
                        <p>Total Price</p>
                        <p>{data.totalPrice} Rs</p>
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



// imimport React, {useState} from 'react';
// import {Divider} from '@mui/material';
// import Button from '../../layouts/button/Button';
// import {useNavigate} from 'react-router-dom';
// import CartItem from './CartItem';
// import {useSelector} from 'react-redux';
// import {selectSelectedItems} from '../../redux/cartItem/cartItemSlice';
// import image1 from '../../images/menu1.jpg';
// import image2 from '../../images/menu2.jpg';
// import image3 from '../../images/menu3.jpg';
// import image4 from '../../images/menu4.jpg';
//
// const Cart = () => {
//     const navigate = useNavigate();
//     const cartItems = useSelector(selectSelectedItems);
//
//     // const [data,setData]=useState([{
//     //     quantity:11,
//     //     price:429,
//     //     discount:600,
//     //     delivery:150,
//     //     totalPrice:579
//     // }])
//
//     const items = [
//         {
//             id: 1,
//             image: image1,
//             name: 'Black Coffee',
//             price: 28,
//             discountPrice: 10,
//             discount: 55,
//             initialQuantity: 3
//         },
//         {
//             id: 2,
//             image: image2,
//             name: 'Turkish Coffee',
//             price: 190,
//             discountPrice: 180,
//             discount: 18,
//             initialQuantity: 2
//         },
//         {
//             id: 3,
//             image: image3,
//             name: 'Cappuccino',
//             price: 28,
//             discountPrice: 10,
//             discount: 44,
//             initialQuantity: 3
//         },
//         {
//             id: 4,
//             image: image4,
//             name: 'Masala Chai',
//             price: 13.99,
//             discountPrice: 3,
//             discount: 80,
//             initialQuantity: 3
//         },
//
//         // Add more items as needed
//     ];
//     // Calculate initial data based on cartItems
//     const initialData = {
//         quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
//         price: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
//         discount: cartItems.reduce((total, item) => total + ((item.price - item.discountedPrice) * item.quantity), 0),
//         // totalPrice: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) + 150, // Adding delivery charges of 150
//         delivery: 150, // Assuming fixed delivery cost // Assuming fixed delivery cost
//     };
//
//     const [data, setData] = useState(initialData);
//     const handleCheckOutClick = () => {
//         navigate('/checkout');
//     };
//
//     const handleRemoveItem = (itemId: number) => {
//         // Remove item from cartItems state
//         const updatedCartItems = cartItems.filter(item => item.id !== itemId);
//         // Optionally, update cart state in Redux or local state
//         console.log(`Item ${itemId} removed from cart`);
//     };
//     return (
//         <div className="lg:grid grid-cols-3 m-5 p-3">
//             <div className="col-span-2">
//                 {/*{cartItems.map((item, index) => (*/}
//                 {/*    <CartItem key={index} product={item} />*/}
//                 {/*))}*/}
//                 {items.map(item => (
//                     <CartItem
//                         key={item.id}
//                         id={item.id}
//                         image={item.image}
//                         name={item.name}
//                         discountPrice={item.discountPrice}
//                         price={item.price}
//                         discount={item.discount}
//                         initialQuantity={item.initialQuantity}
//                         onRemove={handleRemoveItem} // Pass the remove function to CartItem
//
//                     />
//                 ))}
//
//             </div>
//
//             <div className="col-span-1 shadow-2xl rounded border-2 px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
//                 <div className="">
//                     <h2 className="font-semibold opacity-50 uppercase pb-5">Price Details</h2>
//                 </div>
//
//                 <Divider/>
//
//                 <div className="pb-2">
//                     <div className="flex justify-between font-semibold mt-3">
//                         <p>Quantity</p>
//                         <p>{data.quantity}</p>
//                     </div>
//                     <div className="flex justify-between font-semibold mt-3">
//                         <p>Price</p>
//                         <p>{data.price} Rs</p>
//                     </div>
//                     <div className="flex justify-between font-semibold mt-3">
//                         <p>Discount</p>
//                         <p className="text-green-600">{data.discount} Rs</p>
//                     </div>
//                     <div className="flex justify-between font-semibold mt-3">
//                         <p>Delivery</p>
//                         <p className="text-green-600">{data.delivery} Rs</p>
//                     </div>
//                 </div>
//
//                 <Divider/>
//
//                 <div>
//                     <div className="flex justify-between font-semibold mt-4 pb-5">
//                         <p>Total Price</p>
//                         <p>{data.price} Rs</p>
//                     </div>
//                 </div>
//
//                 <Divider/>
//
//                 <div className="mt-3 flex justify-center">
//                     <div className="w-full">
//                         <Button title="CheckOut" onClick={handleCheckOutClick}/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Cart;