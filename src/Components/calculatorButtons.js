import React from "react";

const CalculatorButtons=({name,label,changePreview})=>{
    return(
        <div>
            <button 
            id={name}
            onClick={()=>{changePreview(label)}}
            >
                {label}
            </button>
        </div>
    )
}

export default CalculatorButtons;