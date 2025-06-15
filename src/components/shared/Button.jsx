import React from "react";

export default function Button({children, onClick, variant = 'primary', type = 'button'}) {
    const variantClass = `button-${variant}`;
    return (
        <button type={type} onClick={onClick} className={`button ${variantClass}`}>
            {children}
        </button>
    );
}