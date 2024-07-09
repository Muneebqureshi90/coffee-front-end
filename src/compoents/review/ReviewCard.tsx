import React from 'react';
import Button from "../../layouts/button/Button";
import {BsStarFill, BsStarHalf} from "react-icons/bs";
import { FaQuoteRight } from "react-icons/fa"; // Import the correct quote icon

interface ReviewCardProps {
    img: string;
    title: string;
    description:string;
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
                {/*"Urban Farming's products have completely transformed my approach to sustainable living. Their fresh and organic crops are a testament to their commitment to quality and environmental stewardship. Each harvest brings forth a bounty of vibrant flavors and nutritional goodness, making every meal a wholesome delight. I've never tasted produce quite like theirs – it's like nature's goodness on a plate. Urban Farming has truly set the bar high for ethical and eco-friendly agriculture, and I couldn't be more impressed with their dedication to nourishing both people and the planet."            */}
                {props.description}
            </p>
        </div>
    );
};

export default ReviewCard;
