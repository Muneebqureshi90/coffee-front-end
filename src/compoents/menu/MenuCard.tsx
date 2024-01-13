import React from 'react';
import Button from "../../layouts/button/Button";
import {FaShoppingCart} from "react-icons/fa";

interface MenuCardProps {
    img: string;
    title: string;
    value: string;
    discountedValue:string;
    // Add other props with their types if needed
}

const MenuCard: React.FC<MenuCardProps> = (props) => {
    return (
        <div className={'menu-card w-full lg:w-1/4 bg-white m-9 p-3 rounded-lg'}>
            <div className={'rounded-xl'}>
                <img src={props.img} alt="img"/>
            </div>
            <div className={'p-2 mt-5 '}>
                <div className={'flex flex-row justify-between'}>
                    <h3 className={'font-semibold text-xl'}>{props.title}</h3>
                    <h3 className={'font-semibold text-xl'}>
                        <span style={{color: 'red', textDecoration: 'line-through'}}>{props.value}</span>
                        <span style={{color: 'green'}}> {props.discountedValue}</span></h3>
                </div>
                <div className={'flex flex-row justify-between mt-3'}>
                    <div className={'flex gap-2'}>
                        <button
                            className={'hover:scale-110 px-4 text-sm border-2 border-brightColor bg-backgroundColor hover:text-brightColor transition-all rounded-lg'}>Hot
                        </button>
                        <button
                            className={'hover:scale-110 px-4 text-sm border-2 border-brightColor bg-backgroundColor hover:text-brightColor transition-all rounded-lg'}>Cold
                        </button>
                    </div>
                    <span className={'flex items-center bg-backgroundColor px-3 py-3 rounded-full cursor-pointer'}>
            <FaShoppingCart size={20}/>
          </span>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
