import React from 'react';
import Button from "../../layouts/button/Button";
import MenuCard from "./MenuCard";

const Menu = () => {
    return (
        <div className={'menu min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor shadow-2xl'}>
            <h1 className={'font-bold text-center text-4xl mt-24 mb-8'}>Our Menu</h1>
            <div className={'flex flex-wrap pb-8 gap-8 justify-center'}>
                <MenuCard
                    title="Espresso"
                    value="1300"
                    discountedValue={"1999"}
                    img={require("../../images/menu1.jpg")}
                />
                <MenuCard
                    title="Cappuccino"
                    value="1200"
                    discountedValue={"999"}
                    img={require("../../images/menu2.jpg")}
                />
                <MenuCard
                    title="Latte"
                    value="2500"
                    discountedValue={"1500"}
                    img={require("../../images/menu3.jpg")}
                />
                <MenuCard
                    title="Americano"
                    value="1800"
                    discountedValue={"1200"}
                    img={require("../../images/menu4.jpg")}
                />
                <MenuCard
                    title="Macchiato"
                    value="500"
                    discountedValue={"350"}
                    img={require("../../images/menu5.jpg")}
                />
                <MenuCard
                    title="Doppio"
                    value="5000"
                    discountedValue={"4310"}
                    img={require("../../images/menu6.jpg")}
                />
                <MenuCard
                    title="Macchiato"
                    value="500"
                    discountedValue={"350"}
                    img={require("../../images/menu5.jpg")}
                /> <MenuCard
                title="Macchiato"
                value="500"
                discountedValue={"350"}
                img={require("../../images/menu5.jpg")}
            /> <MenuCard
                title="Macchiato"
                value="500"
                discountedValue={"350"}
                img={require("../../images/menu5.jpg")}
            /> <MenuCard
                title="Macchiato"
                value="500"
                discountedValue={"350"}
                img={require("../../images/menu5.jpg")}
            />

            </div>
        </div>
    );
};

export default Menu;
