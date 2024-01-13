import React from 'react';
import Button from "../../layouts/button/Button";
import ProductCard from "./ProductCard";


interface ProductProps {
    onAddToCart: () => void;
}

const Product: React.FC<ProductProps> = ({ onAddToCart }) => {
    return (
        <div className={'product min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor'}>
            <h1 className={'font-bold text-4xl text-center lg:mt-14 mt-24 mb-8'}>Our Products</h1>
            <div className={' mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-center'}>
                <ProductCard img={require("../../images/product1.jpg")} title={'Nespresso'} value={''} onAddToCart={onAddToCart} />
                <ProductCard img={require("../../images/product2.jpg")} title={'AeroPress'} value={''} onAddToCart={onAddToCart} />

            </div>
        </div>
    );
};

export default Product;
