import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Button from '../../layouts/button/Button';

const Footer = () => {
    return (
        <div className={'bg-gradient-to-r from-[#FFDCAB] to-[#AB6B2E] text-black rounded-t-3xl mt-8 md:mt-0'}>
            <div className={'flex flex-col md:flex-row justify-between p-8 md:px-32 px-5'}>
                <div className={'w-full md:w-1/4'}>
                    <h1 className={'font-bold text-xl pb-4'}>Coffee With Me</h1>
                    <p className={'text-lg'}>
                        Discover a cozy place where every cup tells a story about the love for coffee and the joy of sharing it
                        with you.
                    </p>
                </div>
                <div className={'md:ml-12'}>
                    <h1 className={'font-medium text-xl pb-4 pt-5 md:pt-0'}>Links</h1>
                    <nav className={'flex flex-col gap-2'}>
                        <a className={'hover:text-backgroundColor transition-all cursor-pointer'} href="/">
                            Menu
                        </a>
                        <a className={'hover:text-backgroundColor transition-all cursor-pointer'} href="/">
                            About Us
                        </a>
                        <a className={'hover:text-backgroundColor transition-all cursor-pointer'} href="/">
                            Products
                        </a>
                        <a className={'hover:text-backgroundColor transition-all cursor-pointer'} href="/">
                            Reviews
                        </a>
                    </nav>
                </div>
                <div className={'md:ml-12'}>
                    <h1 className={'font-medium text-xl pb-4 pt-5 md:pt-0'}>Menu</h1>
                    <nav className={'flex flex-col gap-2'}>
                        <a className={'hover:text-backgroundColor transition-all cursor-pointer'} href="/">
                            Cappuccino
                        </a>
                        <a className={'hover:text-backgroundColor transition-all cursor-pointer'} href="/">
                            Latte
                        </a>
                        <a className={'hover:text-backgroundColor transition-all cursor-pointer'} href="/">
                            Americano
                        </a>
                    </nav>
                </div>
                <div className={'md:ml-12'}>
                    <h1 className={'font-medium text-xl pb-4 pt-5 md:pt-0'}>Contact Us</h1>
                    <nav className={'flex flex-col gap-2'}>
                        <a
                            className={'hover:text-backgroundColor transition-all cursor-pointer'}
                            href="mailto:muneebhaider564@gmail.com"
                        >
                            muneebhaider564@gmail.com
                        </a>
                        <a className={'hover:text-backgroundColor transition-all cursor-pointer'} href="tel:+923011116259">
                            +92 301 111 6259
                        </a>
                        <div className={'flex gap-2'}>
                            <a
                                className={'hover:text-backgroundColor transition-all cursor-pointer'}
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                className={'hover:text-backgroundColor transition-all cursor-pointer'}
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                className={'hover:text-backgroundColor transition-all cursor-pointer'}
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                className={'hover:text-backgroundColor transition-all cursor-pointer'}
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
            <div className={'text-center p-4'}>
                <p className={'text-lg'}>
                    @copyright developed by{' '}
                    <span className={'text-backgroundColor font-bold'}>muneeb programmer</span> | All rights reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
