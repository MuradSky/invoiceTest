import React from 'react';

const Input = props => {

    return(  
        <input
            // style={props.isError ? {color: "red"} : {}} 
            id={props.name}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className = {props.classnames}
            {...props}
            
        />
    );
};

export default Input;