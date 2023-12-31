import React from "react"
import './styled/input.scss'
type Props = {
    type?: string,
    placeholder?: string
    value: any,
    onChange: (text: any) => void,
    onBlur?: () => void,
    onClick?: () => void,
    disabled?: boolean,
    onKeyDown?: (e: any) => void
}


export const Input = React.forwardRef<HTMLInputElement, Props>(({ onClick, placeholder, type, onChange, value, onBlur, onKeyDown, disabled = false }, ref) => {
    return (
        <>
            <input
                onClick={onClick}
                ref={ref}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                className="input"
            />
        </>
    )
})



