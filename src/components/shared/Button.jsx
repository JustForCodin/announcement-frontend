import React from "react";

export function Button({childern, onClick, variant = 'primary', type = 'button'}) {
    const variantClass = `button-${variant}`;
    return (
        <button type={type} onClick={onClick} className={`button ${variantClass}`}>
            {childern}
        </button>
    );
}