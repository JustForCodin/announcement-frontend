import React from "react";

export function Card({children, classname = ''}) {
    return (
        <div className={`card ${classname}`}>
            {children}
        </div>
    );
}