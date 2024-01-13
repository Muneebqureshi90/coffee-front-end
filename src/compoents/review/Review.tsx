import React from 'react';
import Button from "../../layouts/button/Button";
import ReviewCard from "./ReviewCard";


const Review = () => {
    return (
        <div className={'min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor'}>
            <h1 className={'font-bold text-center text-4xl lg:mt-14 mt-24'}>Customers Reviews</h1>
            <div className={'flex flex-col lg:flex-row gap-5 justify-center py-4 my-8'}>
                <ReviewCard img={require("../../images/pic1.png")} title={'Olivia Ava'}/>
                <ReviewCard img={require("../../images/pic2.png")} title={'John Deo'}/>
                <ReviewCard img={require("../../images/pic3.png")} title={'Sofia Zoe'}/>
            </div>
        </div>
    );
};

export default Review;
