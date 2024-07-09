import React from 'react';
import Button from "../../layouts/button/Button";
import { FaShoppingCart } from "react-icons/fa";
import { Menu } from '../../redux/menu/MenuSlice';
import defaultImage from '../../images/menu5.jpg'; // Import your default image



interface MenuCardProps {
    menu: Menu;
    onAddToCart: (itemId: string) => void;
}

const MenuCard: React.FC<MenuCardProps> = (props) => {
    const handleAddToCart = () => {
        // Call onAddToCart with an example itemId (replace with actual itemId logic)
        props.onAddToCart('someItemId');
    };
    const imageSrc = props.menu.img || defaultImage;

    return (
        <div className={'menu-card w-full lg:w-1/4 bg-white m-9 p-3 rounded-lg'}>
            <div className={'rounded-xl'}>
                <img className={'rounded-lg'} src={imageSrc} alt={'img'} />
            </div>
            <div className={'p-2 mt-5 '}>
                <div className={'flex flex-row justify-between'}>
                    <h3 className={'font-semibold text-xl'}>{props.menu.title}</h3>
                    <h3 className={'font-semibold text-xl'}>
                        <span style={{ color: 'red', textDecoration: 'line-through' }}>{props.menu.amount}</span>
                        <span style={{ color: 'green' }}> {props.menu.discount_amount}</span></h3>
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
                    <span className={'hover:scale-110 flex items-center bg-backgroundColor px-3 py-3 rounded-full cursor-pointer'}>
                        <FaShoppingCart size={20} onClick={handleAddToCart} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
