import React from 'react';
import Button from "../../layouts/button/Button";
import ReviewCard from "./ReviewCard";


const Review = () => {
    return (
        <div className={'min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor'}>
            <h1 className={'font-bold text-center text-4xl lg:mt-14 mt-24'}>Customers Reviews</h1>
            <div className="flex flex-col lg:flex-row gap-5 justify-center py-4 my-8">
                <ReviewCard img={require("../../images/pic1.png")} title={'Emma Smith'}
                            description={"The coffee selection at Brew Haven is exceptional. Their commitment to quality and sustainability is evident in every cup. Each blend offers a unique and delightful flavor profile, making every morning brew a ritual I look forward to. Brew Haven has truly set the bar high in the world of artisanal coffee."}/>
                <ReviewCard img={require("../../images/pic2.png")} title={'James Brown'}
                            description={"I'm impressed with Brew Haven's dedication to ethical sourcing and their passion for coffee craftsmanship. Their beans are meticulously roasted to perfection, resulting in a smooth and satisfying coffee experience. Whether it's their single-origin beans or specialty blends, Brew Haven consistently delivers excellence."}/>
                <ReviewCard img={require("../../images/pic3.png")} title={'Sophie Taylor'}
                            description={"Brew Haven's commitment to sustainability and community support is commendable. Every cup of coffee not only tastes great but also supports local farmers and environmental initiatives. It's more than just coffee; it's a commitment to a better world through every sip."}/>
            </div>

        </div>
    );
};

export default Review;
