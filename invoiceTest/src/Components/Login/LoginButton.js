import React from 'react'; 

const Button = props =>{

    return(
        <button type="submit" className={props.className} disabled={props.disabled} >
            {props.text}
        </button>
    );
};  

export default Button;