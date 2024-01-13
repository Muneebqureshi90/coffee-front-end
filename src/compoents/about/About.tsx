import React from 'react';
import Button from "../../layouts/button/Button";


const About = () => {
    return (
        <div className={'min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 bg-backgroundColor'}>
            <h1 className={'font-bold text-4xl text-center lg:mt-14 mt-24 mb-8'}>About Us</h1>
            <div className={'flex flex-col lg:flex-row items-center gap-5'}>
                <div className="image-container w-full lg:w-2/4">
                    <img className={'rounded-lg'} src={require("../../images/about.jpg")} alt="Description of the image" />
                </div>
                <div className={'w-full lg:w-2/4 p-4 space-y-3'}>
                    <h2  className={'font-bold text-3xl text-center lg:mt-14 mt-24 mb-8'}>What make our coffee Special?</h2>
                    <p className={' text-xl'}>
                        Our coffee is a result of a meticulous process that begins with selecting
                        the finest coffee beans from around the world. We source beans with unique
                        flavors and characteristics that set our coffee apart.
                    </p>
                    <p className={' text-xl'}>
                        From roasting to brewing, every step is handled with precision to ensure
                        that you experience the perfect cup of coffee. Our dedication to quality
                        and passion for coffee reflects in every sip, providing you with a
                        delightful and memorable coffee experience.
                    </p>
                    <Button  title={"Learn More"}/>
                </div>
            </div>
        </div>
    );
};

export default About;
