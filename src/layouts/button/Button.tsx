import React from 'react';

interface ButtonProps {
    title: string;
    onClick?: () => void; // Make onClick prop optional
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <div onClick={props.onClick} className={'text-center px-4 py-2 border-2 border-black bg-[#FFDCAB] hover:text-[#AB6B2E] transition-all rounded-full  hover:scale-110'}>
            {props.title}
        </div>
    );
};

export default Button;
