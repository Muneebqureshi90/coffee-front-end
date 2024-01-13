import React from 'react';
import Button from "../../layouts/button/Button";

const Home = () => {
    return (
        <div className={'Home min-h-screen flex flex-col  lg:flex-row items-center lg:px-32 px-5 gap-10 bg-gradient-to-r from-[#FFDCAB] to-[#AB6B2E]'}>
            <div className={' lg:w-2/4 space-y-4 mt-20 lg:mt-0 lg:pr-6'}>
                <h1 className={' font-bold text-5xl text-center lg:text-start leading-tight'}>
                    Start your day with a steaming cup of coffee
                </h1>
                <p>Boost your productivity and build your mood with a glass of coffee in the morning</p>

                <div className={'flex flex-row items-center justify-center gap-6 text-center text-lg font-semibold'}>
                    <Button title={"Add to Cart"} />
                    <Button title={"More Menu"} />
                </div>
            </div>

            <div className="lg:w-2/4 relative">
                <div className="image-container">
                    <img src={require("../../images/home (1).png")} alt="Description of the image"/>
                </div>

                {/*<div className=" absolute font-semibold flex flex-row gap-10 text-lg bg-white px-8 py-2 top-20 right-0 rounded-full shadow-2xl">*/}
                    <div className="lg:absolute font-semibold flex flex-row lg:flex-row gap-6 lg:gap-10 text-lg bg-white p-3 lg:p-4 top-20 lg:top-0 right-0 rounded-full shadow-2xl">

                    <div>
                        <h2>14k</h2>
                    </div>
                    <div>
                        <h2>Cappuccino</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
