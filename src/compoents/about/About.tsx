import React from 'react';
import Button from "../../layouts/button/Button";


const About = () => {
    return (
        <div className={'min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 bg-backgroundColor'}>
            <h1 className={'font-bold text-4xl text-center lg:mt-14 mt-24 mb-8'}>About Us</h1>
            <div className={'flex flex-col lg:flex-row items-center gap-5'}>
                <div className="image-container w-full lg:w-2/4">
                    <img className={'rounded-lg'} src={require("../../images/menu4.jpg")}
                         alt="Description of the image"/>
                </div>
                <div className={'w-full lg:w-2/4 p-4 space-y-3'}>
                    <h2 className={'font-bold text-3xl text-center lg:mt-14 mt-24 mb-8'}>Why Our Coffee Stands Out</h2>
                    <p className={'text-xl'}>
                        Our coffee cultivation is a testament to meticulous planning and a dedication to sustainable
                        practices.
                        We begin by hand-selecting the finest coffee beans, ensuring they meet our stringent criteria
                        for quality
                        and flavor across diverse growing conditions.
                    </p>
                    <p className={'text-xl'}>
                        From planting to harvest, each stage is meticulously managed to optimize yields while respecting
                        the
                        environment. Our unwavering commitment to sustainable coffee farming guarantees that you enjoy
                        the
                        highest-quality beans while safeguarding our planet for future generations.
                    </p>

                    <Button title={"Learn More"}/>
                </div>

            </div>
        </div>
    );
};

export default About;
