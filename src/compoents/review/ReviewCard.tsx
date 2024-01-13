import React from 'react';
import Button from "../../layouts/button/Button";
import {BsStarFill, BsStarHalf} from "react-icons/bs";
import { FaQuoteRight } from "react-icons/fa"; // Import the correct quote icon

interface ReviewCardProps {
    img: string;
    title: string;

}

const ReviewCard: React.FC<ReviewCardProps> = (props) => {
    return (
        <div className={'flex flex-col w-full lg:w-2/6 bg-white p-3 rounded-lg gap-5 hover:scale-110 shadow-2xl'}>
            <div className={'flex flex-row items-center lg:justify-start justify-center'}>
                <div className={'w-1/4'}>
                    <img className={'rounded-full'} src={props.img} alt=""/>
                </div>
                <div className={'mx-3'}>
                    <h2 className={'font-bold text-xl'}>{props.title}</h2>
                    <div className={'flex'}>
                        <BsStarFill className={'text-brightColor'}/>
                        <BsStarFill className={'text-brightColor'}/>
                        <BsStarFill className={'text-brightColor'}/>
                        <BsStarFill className={'text-brightColor'}/>
                        <BsStarHalf className={'text-brightColor'}/>
                    </div>
                </div>
                <span className={'ml-16'}>
                    <FaQuoteRight className={'text-backgroundColor'} size={42}/>
                </span>

            </div>
            <p className={''}>
                I recently tried the special blend of coffee at Coffee With Me, and it was an amazing experience. The rich aroma and bold flavor left a lasting impression. The cozy ambiance of the cafe made it the perfect spot to enjoy a cup of coffee. I highly recommend trying their coffee – it's a delightful treat for any coffee enthusiast!
            </p>

        </div>
    );
};

export default ReviewCard;
