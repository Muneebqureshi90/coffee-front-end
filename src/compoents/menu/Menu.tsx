import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../layouts/button/Button";
import MenuCard from "./MenuCard";
import { fetchMenus, selectMenus, clearMenus } from '../../redux/menu/MenuSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProductProps {
    onAddToCart: () => void;
}

const Menu: React.FC<ProductProps> = ({ onAddToCart }) => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const menus = useSelector(selectMenus);  // Corrected selector name
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: { user: { user: any, token: string } }) => !!state.user.token);

    useEffect(() => {
        dispatch(fetchMenus());
    }, [dispatch]);

    const handleClearProducts = () => {
        dispatch(clearMenus());
    };

    const handleAddToCart = () => {
        if (isLoggedIn) {
            onAddToCart();
        } else {
            toast.error('Please log in to add products to the cart.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false,
                onClose: () => {
                    navigate('/login');
                },
            });
        }
    };

    return (
        <div className={'menu min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor shadow-2xl'}>
            <h1 className={'font-bold text-center text-4xl mt-24 mb-8'}>Our Menu</h1>
            <div className={'flex flex-wrap pb-8 gap-8 justify-center'}>
                {menus.map((menu: any) => (
                    <MenuCard
                        key={menu.id}
                        menu={menu}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;
