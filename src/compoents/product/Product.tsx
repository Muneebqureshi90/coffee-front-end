// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ProductCard from './ProductCard';
// import { fetchProducts, selectProducts } from '../../redux/product/ProductSlice';
// import { ThunkDispatch } from 'redux-thunk';
// import { AnyAction } from 'redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { addCartItem } from '../../redux/cart/CartSlice';
// import { selectUserId } from '../../redux/auth/AuthSlice'; // Import selectors
//
// interface ProductProps {
//     onAddToCart: (productId: string) => void;
// }
//
// const Product: React.FC<ProductProps> = ({ onAddToCart }) => {
//     const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
//     const products = useSelector(selectProducts);
//     const navigate = useNavigate();
//
//     // Use the selectors to access auth state
//     const isLoggedIn = useSelector((state: { auth?: { userId: string; token: string } }) => !!state.auth?.token);
//     const userId = useSelector(selectUserId);
//
//     useEffect(() => {
//         dispatch(fetchProducts());
//     }, [dispatch]);
//
//     const handleAddToCart = (productId: string) => {
//         if (isLoggedIn) {
//             onAddToCart(productId);
//             dispatch(addCartItem({ userId: Number(userId), productId, quantity: 1 }));
//         } else {
//             toast.error('Please log in to add products to the cart.', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: false,
//                 onClose: () => {
//                     navigate('/login');
//                 },
//             });
//         }
//     };
//
//     return (
//         <div className="product min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor">
//             <h1 className="font-bold text-primary lg:text-6xl text-5xl mt-16 text-center">Our Products</h1>
//             <p className="text-primary lg:text-xl text-lg text-center">“Indulge in the Perfection of Every Sip”</p>
//             <div className="product__box grid lg:grid-cols-3 md:grid-cols-2 gap-5 my-16">
//                 {products?.map((product: any) => (
//                     <ProductCard
//                         key={product.id}
//                         product={product}
//                         onAddToCart={() => handleAddToCart(product.id)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Product;



// Product.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { fetchProducts, selectProducts, clearProducts } from '../../redux/product/ProductSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {  } from 'react-router-dom'; // Import useHistory hook for redirection
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addCartItem } from '../../redux/cart/CartSlice';
import error = toast.error;
import { selectUserId } from '../../redux/auth/AuthSlice';

// Product interface definition
interface ProductProps {
    onAddToCart: (productId: string) => void; // Update the type to accept productId
}


const Product: React.FC<ProductProps> = ({ onAddToCart }) => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const products = useSelector(selectProducts);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: { user: { user: any, token: string } }) => !!state.user.token);
    // const userId = useSelector((state: { user: { user: any, token: string, userId: number } }) => !state.user.userId);
    const userId = useSelector(selectUserId);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleClearProducts = () => {
        dispatch(clearProducts()); // Dispatch the clearProducts action
    };

    const handleAddToCart = (productId: string) => {
        // Check if the user is logged in (you can replace this with your actual authentication logic)

        if (isLoggedIn) {
            if (!userId) {
                onAddToCart(productId);
                dispatch(addCartItem({userId: Number(userId), productId, quantity: 1}));
            } else {
                console.error('User ID not found.');
            }
        } else {
            toast.error("You have to login to add items to the cart.");
            navigate("/login");
        }
    }


        return (
        <div className={'product min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor'}>
            <h1 className={'font-bold text-4xl text-center lg:mt-14 mt-24 mb-8'}>Our Products</h1>

            {/* Button to clear products */}
            {/* <button onClick={handleClearProducts}>Clear Products</button> */}

            <div className={' mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-center'}>
                {products.map((product: any) => (
                    <ProductCard
                        key={product.id}  // Add a unique key using the product ID
                        product={product}
                        onAddToCart={(productId) => handleAddToCart(productId)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Product;