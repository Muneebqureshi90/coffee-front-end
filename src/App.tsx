import React, {useState} from 'react';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './compoents/navbar/Navbar';

import LoginForm from "./pages/auth/LoginForm";

import Home from "./compoents/home/Home";
import Menu from "./compoents/menu/Menu";
import About from "./compoents/about/About";
import Product from "./compoents/product/Product";
import Review from "./compoents/review/Review";
import Footer from "./compoents/footer/Footer";
import RegisterForm from "./pages/auth/RegisterForm";
import Cart from "./compoents/cart/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './pages/auth/ErrorForm';
import Checkout from "./pages/checkout/Checkout";
import PaymentSuccess from "./pages/checkout/PaymentSuccess";
import PaymentFailure from "./pages/checkout/PaymentFailure";
import ForgetPassword from "./pages/auth/ForgetPassword";
import PasswordResetSent from "./pages/auth/PasswordResetSent";
const App: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);
    const [isItemInCart, setIsItemInCart] = useState(false);

    const handleAddToCart = () => {
        if (isItemInCart) {
            setCartCount(cartCount - 1);
        } else {
            setCartCount(cartCount + 1);
        }
        setIsItemInCart(!isItemInCart);
    };
//     const isItemInCart = itemStates[itemId] || false;
//
//     if (isItemInCart) {
//         setCartCount(cartCount - 1);
//     } else {
//         setCartCount(cartCount + 1);
//     }
//
//     setItemStates((prevItemStates) => ({
//         ...prevItemStates,
//         [itemId]: !isItemInCart,
//     }));
// };
    return (

        <div className={'app'}>




            <Navbar cartCount={cartCount} />
            {/*<LoginForm/>*/}
            {/*<RegisterForm/>*/}
            {/*<Product/>*/}

            <ToastContainer position={"bottom-center"}/>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/signup" element={<RegisterForm/>}/>
                <Route path="/error" element={<ErrorPage />} />

                <Route path="/menu" element={<Menu onAddToCart={handleAddToCart}/>} />
                <Route path="/about" element={<About />} />
                <Route path="/product" element={<Product onAddToCart={handleAddToCart} />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-failure" element={<PaymentFailure />} />

                <Route path="/forget" element={<ForgetPassword />} />
                <Route path="/password-reset-sent" element={<PasswordResetSent />} />

                <Route path="/review" element={<Review />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Cart />} />
            </Routes>
            {/*<main>*/}
            {/*    <div id="home">*/}
            {/*        <Home/>*/}
            {/*    </div>*/}
            {/*    <div id="menu">*/}
            {/*        <Menu/>*/}
            {/*    </div>*/}
            {/*    <div id="about">*/}
            {/*        <About/>*/}
            {/*    </div>*/}
            {/*    <div id="product">*/}
            {/*        <Product/>*/}
            {/*    </div>*/}
            {/*    <div id="review">*/}
            {/*        <Review/>*/}
            {/*    </div>*/}

            {/*</main>*/}
            <Footer/>
        </div>

    );
}

export default App;


// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Navbar from './compoents/navbar/Navbar';
//
//
// import Home from "./compoents/home/Home";
// import Menu from "./compoents/menu/Menu";
// import About from "./compoents/about/About";
// import Product from "./compoents/product/Product";
// import Review from "./compoents/review/Review";
// import Footer from "./compoents/footer/Footer";
//
// function App() {
//     return (
//         <div className="app">
//
//             <Navbar />
//
//                         <main>
//                             <div id="home">
//                                 <Home />
//                             </div>
//                             <div id="menu">
//                                 <Menu />
//                             </div>
//                             <div id="about">
//                                 <About />
//                             </div>
//                             <div id="product">
//                                 <Product />
//                             </div>
//                             <div id="review">
//                                 <Review />
//                             </div>
//                         </main>
//
//             <Footer />
//
//         </div>
//     );
// }
//
// export default App;
