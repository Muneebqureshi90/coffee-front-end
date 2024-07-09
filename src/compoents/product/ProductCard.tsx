// import React from 'react';
// import Button from "../../layouts/button/Button";
// import { BsStarFill, BsStarHalf } from "react-icons/bs";
// import { Product } from '../../redux/product/ProductSlice';
// import defaultImage from '../../images/hands-cataloging-uncooked-buckwheat-gray.jpg';
// import { API_BASE_URL } from "../../config/ApiConfig";
//
// interface ProductCardProps {
//     product: Product;
//     onAddToCart: (itemId: string) => void;
// }
//
// const ProductCard: React.FC<ProductCardProps> = (props) => {
//     const handleAddToCart = () => {
//         props.onAddToCart('someItemId');
//     };
//
//     const imageSrc = props.product.imageUrl ? `${API_BASE_URL}/v1/product/image/${props.product.imageUrl}` : defaultImage;
//
//     return (
//         <div className={'productCard w-full bg-white p-3 rounded-lg'}>
//             <img className={'rounded-lg'} src={imageSrc} alt={props.product.title} />
//             <div className={'flex flex-col items-center lg:6 mt-5 gap-4'}>
//                 <h2 className={'font-bold text-xl'}>{props.product.title}</h2>
//                 <div className={'flex'}>
//                     <BsStarFill className={'text-brightColor'} />
//                     <BsStarFill className={'text-brightColor'} />
//                     <BsStarFill className={'text-brightColor'} />
//                     <BsStarFill className={'text-brightColor'} />
//                     <BsStarHalf className={'text-brightColor'} />
//                 </div>
//                 <h3 className={'font-semibold text-lg'}>{props.product.amount} Rs</h3>
//                 <p className={'font-semibold text-sm'}>{props.product.discription}</p>
//                 <Button title={'Add To Cart'} onClick={handleAddToCart} />
//             </div>
//         </div>
//     );
// };
//
// export default ProductCard;


import React, { useState } from 'react';
import Button from "../../layouts/button/Button";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { Product } from '../../redux/product/ProductSlice';
// import defaultImage from '../../images/hands-cataloging-uncooked-buckwheat-gray.jpg';
import { API_BASE_URL } from "../../config/ApiConfig";
import defaultImage from '../../images/menu3.jpg';
import image2 from '../../images/menu5.jpg';
import image3 from '../../images/menu1.jpg';
import image4 from '../../images/menu2.jpg';

interface ProductCardProps {
    product: Product;
    onAddToCart: (itemId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const handleAddToCart = () => {
        props.onAddToCart('someItemId');
    };

    // Construct the image source URL
    const imageSrc = `${API_BASE_URL}/api/v1/product/image/${props.product.imageUrl}`;

    // Local images array for error handling
    // const [data, setData] = useState([
    //     { image: image1 },
    //     { image: image2 },
    //     { image: image3 },
    //     { image: image4 },
    // ]);

    // State to track current local image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <div className={'productCard w-full bg-white p-3 rounded-lg'}>
            <img
                className={'rounded-lg'}
                src={imageSrc}
                alt={props.product.title}
                onError={(e) => {
                    // Handle image load errors by cycling through local images

                        e.currentTarget.src = defaultImage; // Fallback to default image

                }}
            />
            <div className={'flex flex-col items-center lg:6 mt-5 gap-4'}>
                <h2 className={'font-bold text-xl'}>{props.product.title}</h2>
                <div className={'flex'}>
                    <BsStarFill className={'text-brightColor'} />
                    <BsStarFill className={'text-brightColor'} />
                    <BsStarFill className={'text-brightColor'} />
                    <BsStarFill className={'text-brightColor'} />
                    <BsStarHalf className={'text-brightColor'} />
                </div>
                <div className={'flex '}>
                    <h3 className={'font-semibold text-red-700 line-through text-lg'}>{props.product.amount} Rs</h3>
                    <h3 className={'font-semibold text-green-600  pl-4  text-lg'}>{props.product.discount_amount} Rs</h3>
                </div>

                <p className={'font-semibold text-sm'}>{props.product.discription}</p>
                <Button title={'Add To Cart'} onClick={handleAddToCart}/>
            </div>
        </div>
    );
};

export default ProductCard;
