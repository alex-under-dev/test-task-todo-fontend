import React from 'react'
import { IconContext } from 'react-icons';

import './styled/button.scss'


type Props = {
    icon?: React.ReactNode;
    text?: string,
    onClick?: () => void
    type?: 'submit' | 'reset' | 'button'
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(({ onClick, text, icon, type = 'button' }, ref) => {
    return (
        <button
            className='button'
            onClick={onClick}
            ref={ref}
            type={type}
        >
            <IconContext.Provider value={{ size: '20' }}>
                <>
                    {icon}
                </>
            </IconContext.Provider>
            {text}
        </button >
    )
})
