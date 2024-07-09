import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// Define CartItemProps interface
interface CartItemProps {
    id: number;
    name: string;
    price: number;
    discountPrice:number;
    discount: number;
    initialQuantity: number;
    image: string;
    onRemove: (itemId: number) => void; // Define onRemove function prop
}

// Define CartItemType inline
type CartItemType = {
    id: number;
    name: string;
    price: number;
    discount: number;

};

const CartItem: React.FC<CartItemProps> = ({ id, image,discountPrice, name, price, discount, initialQuantity, onRemove }) => {
    const [quantity, setQuantity] = useState(initialQuantity); // Initial quantity state

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleRemove = () => {
        onRemove(id); // Call the onRemove function with item id
        console.log(`Item ${id} removed`);
    };

    return (
        <div className="shadow-2xl rounded-lg p-5 border flex items-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32">
                <img
                    className="w-full h-full rounded-lg"
                    src={image} // Use image prop here
                    alt="Description of the image"
                />
            </div>
            <div className="ml-5 space-y-1">
                <p className="font-semibold">{name}</p>
                <div className="flex space-x-5 items-center pt-5 text-gray-900 mt-6">
                    <p className="font-semibold opacity-80">{discountPrice}RS</p>
                    <p className="opacity-60 line-through">{price}Rs</p>
                    <p className="text-green-600 font-semibold">{discount}% off</p>
                </div>
                <div className="lg:flex items-center lg:space-x-10 pt-4">
                    <div className="flex items-center space-x-3">
                        <IconButton sx={{ color: 'red' }} onClick={decrementQuantity}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <span className="py-1 border px-1 rounded-sm">{quantity}</span>
                        <IconButton sx={{ color: 'green' }} onClick={incrementQuantity}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                        <Button variant="outlined" onClick={handleRemove}>
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;


// import React, { useState } from 'react';
// import { Button, IconButton } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
//
// export interface CartItemProps {
//     id: number;
//     name: string;
//     price: number;
//     discountPrice: number;
//     discount: number;
//     initialQuantity: number;
//     image: string;
//     onRemove: (itemId: number) => void;
// }
//
// const CartItem: React.FC<CartItemProps> = ({ id, image, discountPrice, name, price, discount, initialQuantity, onRemove }) => {
//     const [quantity, setQuantity] = useState(initialQuantity);
//
//     const incrementQuantity = () => {
//         setQuantity(quantity + 1);
//     };
//
//     const decrementQuantity = () => {
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     };
//
//     const handleRemove = () => {
//         onRemove(id);
//         console.log(`Item ${id} removed`);
//     };
//
//     return (
//         <div className="shadow-2xl rounded-lg p-5 border flex items-center">
//             <div className="w-24 h-24 lg:w-32 lg:h-32">
//                 <img
//                     className="w-full h-full rounded-lg"
//                     src={image}
//                     alt="Description of the image"
//                 />
//             </div>
//             <div className="ml-5 space-y-1">
//                 <p className="font-semibold">{name}</p>
//                 <div className="flex space-x-5 items-center pt-5 text-gray-900 mt-6">
//                     <p className="font-semibold opacity-80">{discountPrice}RS</p>
//                     <p className="opacity-60 line-through">{price}Rs</p>
//                     <p className="text-green-600 font-semibold">{discount}% off</p>
//                 </div>
//                 <div className="lg:flex items-center lg:space-x-10 pt-4">
//                     <div className="flex items-center space-x-3">
//                         <IconButton sx={{ color: 'red' }} onClick={decrementQuantity}>
//                             <RemoveCircleOutlineIcon />
//                         </IconButton>
//                         <span className="py-1 border px-1 rounded-sm">{quantity}</span>
//                         <IconButton sx={{ color: 'green' }} onClick={incrementQuantity}>
//                             <AddCircleOutlineIcon />
//                         </IconButton>
//                         <Button variant="outlined" onClick={handleRemove}>
//                             Remove
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default CartItem;
