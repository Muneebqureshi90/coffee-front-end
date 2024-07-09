import React, {useState, MouseEventHandler} from 'react';
import {SiCoffeescript} from 'react-icons/si';
import {Link as RouterLink, NavLink, useNavigate} from 'react-router-dom';
import Button from "../../layouts/button/Button";
import {Close as CloseIcon, Menu as MenuIcon} from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RateReviewIcon from '@mui/icons-material/RateReview';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import {useSelector, useDispatch} from 'react-redux';// Import the useSelector hook from react-redux

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {logout} from '../../redux/auth/AuthSlice';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const Navbar = ({cartCount}: { cartCount: number }) => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
// Assuming your auth slice has a 'user' field
//     const isLoggedIn = useSelector((state: { user: { user: any, token: string } }) => !!state.user.token);
    const isLoggedIn = useSelector((state: { user: { user: any, token: string } }) => !!state.user.token);
    const dispatch = useDispatch();
    ; // Assuming your auth slice has a 'user' field
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const handleLogoutClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault(); // Prevent the default behavior of the anchor element
        // Dispatch the signOut action to update the authentication state
        dispatch(logout());
        closeMenu1();
        navigate('/');  // Navigate to the home page or wherever you want after logout
    };
    const closeMenu1 = () => {
        setDropdownOpen(false);
    };
    const handleChange = () => {
        setMenu(!menu);
    };

    const closeMenu = () => {
        setMenu(false);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };


    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleHomeClick = () => {
        // Add logic for home click, if needed
        closeMenu();
    };

    return (
        <div className={'w-full z-10'}>
            <div>
                <div
                    className="flex flex-row justify-between p-5 lg:px-38 px-5 bg-gradient-to-r from-brightColor to-backgroundColor shadow-md">
                    <div className="flex flex-row items-center cursor-pointer gap-2">
                      
                        <span>
                            <SiCoffeescript size={30}/>
                            {/*<AgricultureIcon fontSize="large"/>*/}
                        </span>
                        <h1 className={'text-xl font-bold'}>Coffee</h1>
                    </div>
                    <nav className={'hidden md:flex flex-row items-center text-lg font-medium gap-10'}>
                        <NavLink to="/"
                                 className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                                 onClick={handleHomeClick}>
                            <HomeIcon/> Home
                            <span
                                className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                        </NavLink>
                        {/*<NavLink to="/menu"*/}
                        {/*         className={'cursor-pointer group relative inline-block hover:text-brightColor'}*/}
                        {/*         onClick={() => closeMenu()}>*/}
                        {/*    <NewspaperIcon/> Menu*/}
                        {/*    <span*/}
                        {/*        className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>*/}
                        {/*</NavLink>*/}
                        <NavLink to="/about"
                                 className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                                 onClick={() => closeMenu()}>
                            <InfoIcon/> About Us
                            <span
                                className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                        </NavLink>
                        <NavLink to="/product"
                                 className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                                 onClick={() => closeMenu()}>
                            <LocalMallIcon/> Products
                            <span
                                className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                        </NavLink>
                        <NavLink to="/review"
                                 className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                                 onClick={() => closeMenu()}>
                            <RateReviewIcon/> Reviews
                            <span
                                className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                        </NavLink>
                    </nav>
                    {(!isLoggedIn && (
                        <div className={'hidden lg:flex justify-between pl-3 '}>
                            <Button title="Login" onClick={handleLoginClick}/>
                            <Button  title="Signup" onClick={handleSignupClick}/>
                        </div>
                    ))}

                    <nav className={'hidden md:flex flex-row items-center text-lg font-medium gap-10'}>

                        {isLoggedIn && (
                            <>
                                <NavLink
                                    to="/cart"
                                    className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                                    onClick={() => closeMenu()}
                                >
                                    <div className="flex items-center">
                                        {cartCount > 0 && (
                                            <div>
                                                <div className="relative">
                                                    <div
                                                        className="absolute flex items-center justify-center bg-gray-500 text-white font-semibold rounded-full left-[-8px] top-[-5px] py-0.5 px-1.5">
                                                        {cartCount}
                                                    </div>
                                                    <ShoppingCartIcon className="text-gray-600"
                                                                      style={{fontSize: '2.4rem'}}/>
                                                </div>


                                            </div>
                                        )}
                                        {cartCount <= 0 && (
                                            <ShoppingCartIcon
                                                className="text-gray-600"
                                                style={{fontSize: '2.4rem'}} // Adjusted to text-7xl for larger size
                                            />
                                        )}
                                    </div>


                                    <span
                                        className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                                </NavLink>


                                <NavLink to="/profile"
                                         className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                                         onClick={() => closeMenu()}>
                                    <AccountCircleIcon className="text-gray-600" style={{fontSize: '2.4rem'}}/>
                                    <span
                                        className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                                </NavLink>
                                <div className="relative inline-block group">
                                    <NavLink
                                        to="/"
                                        className="cursor-pointer hover:text-brightColor"
                                        onClick={handleDropdownToggle}
                                    >
                                        <SettingsIcon className=" text-gray-600" style={{fontSize: '2.4rem'}}/> Setting
                                        <span
                                            className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                                    </NavLink>

                                    {isDropdownOpen && (
                                        <div className="absolute mt-2  bg-white shadow-lg rounded-md flex flex-col">
                                            <NavLink
                                                to="/login"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={handleLogoutClick}
                                            >
                                                <ExitToAppIcon className="mr-2"/> Logout
                                            </NavLink>

                                            <NavLink
                                                to="/more-options"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={closeMenu1}
                                            >
                                                <MoreVertIcon className="mr-2"/> More
                                            </NavLink>
                                        </div>
                                    )}


                                </div>
                                {/*<UncontrolledDropdown nav inNavbar>*/}
                                {/*    <DropdownToggle nav caret style={{ fontSize: '22px', color: 'white' }}>*/}
                                {/*        More*/}
                                {/*    </DropdownToggle>*/}
                                {/*    <DropdownMenu right>*/}
                                {/*        <DropdownItem>*/}
                                {/*            <Link to="mailto:muneebhaider564@gmail.com" style={{ color: 'inherit' }}>*/}
                                {/*                Contact Us*/}
                                {/*            </Link>*/}
                                {/*        </DropdownItem>*/}
                                {/*        <DropdownItem>*/}
                                {/*            <Link to="https://instagram.com/muneebqureshi90?igshid=OGQ5ZDc2ODk2ZA==" style={{ color: 'inherit' }}>*/}
                                {/*                Facebook*/}
                                {/*            </Link>*/}
                                {/*        </DropdownItem>*/}
                                {/*        <DropdownItem>*/}
                                {/*            <Link to="https://instagram.com/muneebqureshi90?igshid=OGQ5ZDc2ODk2ZA==" style={{ color: 'inherit' }}>*/}
                                {/*                Instagram*/}
                                {/*            </Link>*/}
                                {/*        </DropdownItem>*/}
                                {/*    </DropdownMenu>*/}
                                {/*</UncontrolledDropdown>*/}

                            </>
                        )}
                    </nav>
                    <div className={'md:hidden items-center'}>
                        {menu ? (
                            <CloseIcon fontSize="large" onClick={handleChange}/>
                        ) : (
                            <MenuIcon fontSize="large" onClick={handleChange}/>
                        )}
                    </div>
                </div>

                <div
                    className={`${menu ? "translate-x-0" : "-translate-x-full"} lg:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl content-center text-center pt-8 pb-4 gap-8 w-full h-fit transition duration-300`}>
                    <NavLink to="/" className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                             onClick={() => closeMenu()}>
                        <HomeIcon/> Home
                        <span
                            className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                    </NavLink>
                    {/*<NavLink to="/menu" className={'cursor-pointer group relative inline-block hover:text-brightColor'}*/}
                    {/*         onClick={() => closeMenu()}>*/}
                    {/*    <NewspaperIcon/> Menu*/}
                    {/*    <span*/}
                    {/*        className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>*/}
                    {/*</NavLink>*/}
                    <NavLink to="/about" className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                             onClick={() => closeMenu()}>
                        <InfoIcon/> About Us
                        <span
                            className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                    </NavLink>
                    <NavLink to="/products"
                             className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                             onClick={() => closeMenu()}>
                        <LocalMallIcon/> Products
                        <span
                            className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                    </NavLink>
                    <NavLink to="/review"
                             className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                             onClick={() => closeMenu()}>
                        <RateReviewIcon/> Reviews
                        <span
                            className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                    </NavLink>
                    {isLoggedIn && (
                        <>
                            <NavLink
                                to="/cart"
                                className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                                onClick={() => closeMenu()}
                            >
                                <div className="flex items-center">
                                    <ShoppingCartIcon/>
                                    <span className="ml-1">Cart</span>
                                    {cartCount > 0 && (
                                        <span className="badge bg-orange-500 text-white rounded-full px-2 py-1 ml-2">
                {cartCount}
            </span>
                                    )}
                                </div>
                                <span
                                    className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                            </NavLink>


                            <NavLink to="/profile"
                                     className={'cursor-pointer group relative inline-block hover:text-brightColor'}
                                     onClick={() => closeMenu()}>
                                <RateReviewIcon/> Profile
                                <span
                                    className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                            </NavLink>
                            <div className="relative inline-block group">
                                <NavLink
                                    to="/"
                                    className="cursor-pointer hover:text-brightColor"
                                    onClick={() => {
                                        handleDropdownToggle();
                                        closeMenu();
                                    }}
                                >
                                    <SettingsIcon/> Setting
                                    <span
                                        className="line absolute bottom-0 left-0 bg-black h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></span>
                                </NavLink>


                                {isDropdownOpen && (
                                    <div className="absolute mt-2  bg-white shadow-lg rounded-md flex flex-col w-full">
                                        <NavLink
                                            to="/login"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={closeMenu1}

                                        >
                                            <ExitToAppIcon className="mr-2"/> Logout
                                        </NavLink>
                                        <NavLink
                                            to="/more-options"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={closeMenu1}

                                        >
                                            <MoreVertIcon className="mr-2"/> More
                                        </NavLink>
                                    </div>
                                )}
                            </div>

                        </>
                    )}
                    {(!isLoggedIn && (
                        <>
                            <div className={'pl-60'}>
                                <Button title="Login" onClick={handleLoginClick}/>
                            </div>
                            <div className={'pl-60'}>
                                <Button title="SignUp" onClick={handleSignupClick}/>
                            </div>
                        </>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Navbar;
