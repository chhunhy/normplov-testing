import React from 'react'

type props = {
    title: string;
    type?: 'leftIcon' | 'rightIcon' | 'none' ;
    rounded?: 'full' | 'xl';
    outline?: 'true' | 'false';
    icon?: React.ReactNode;
    full?: true | false;
    color?: string;
    onClick?: () => void;
    isDisable?: boolean;
}

export const QuizButton = ({ title, type = 'none', rounded = 'xl', outline = 'false' , icon , full = false , color='#0BBB8A' , onClick, isDisable = false }: props) => {
    return (
        <button type='button' onClick={onClick} disabled={isDisable}
        className={`flex items-center justify-center gap-2 font-semibold
            ${rounded === 'xl' ? 'rounded-xl' : 'rounded-full'}
            ${outline === 'true' ? `bg-transparent border-2 border-primary text-primary` : `text-white bg-primary`}
            ${full ? 'w-full py-2 ' : 'px-4 py-2'}
            ${isDisable ? `bg-primary bg-opacity-40 cursor-not-allowed `: `bg-${color} text-primary`}
            transition duration-200 hover:opacity-80 focus:ring-2 focus:ring-primary focus:outline-none`}
       
          
        >
            {/* Left Icon */}
            {type === 'leftIcon' && icon && <span className="mr-1">{icon}</span>}

            {/* Button Title */}
            <span>{title}</span>

            {/* Right Icon */}
            {type === 'rightIcon' && icon && <span className="ml-1">{icon}</span>}
        </button>
    
    )
}
