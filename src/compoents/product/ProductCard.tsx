import React from 'react';
import Button from "../../layouts/button/Button";
import {BsStarFill, BsStarHalf} from "react-icons/bs";

interface ProductCardProps {
    img: string;
    title: string;
    value: string;
    onAddToCart: (itemId: string) => void; // Update the type definition
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const handleAddToCart = () => {
        // Call onAddToCart with an example itemId (replace with actual itemId logic)
        props.onAddToCart('someItemId');
    };
    return (
        <div className={'productCard w-full  bg-white p-3 rounded-lg'}>

            <img className={'rounded-lg'} src={props.img} alt={'img'}/>
            <div className={'flex flex-col items-center lg:6 mt-5 gap-4'}>
                <h2 className={'font-bold text-xl'}>{props.title}</h2>
                <div className={'flex'}>
                    <BsStarFill className={'text-brightColor'}/>
                    <BsStarFill className={'text-brightColor'}/>
                    <BsStarFill className={'text-brightColor'}/>
                    <BsStarFill className={'text-brightColor'}/>
                    <BsStarHalf className={'text-brightColor'}/>
                </div>
                <h3 className={'font-semibold text-lg'}>1500Rs</h3>
                <Button title={'Add To Cart'} onClick={handleAddToCart} />
            </div>
        </div>
    );
};

export default ProductCard;
