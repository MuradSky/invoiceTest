import React from "react";
import { Link } from "react-router-dom";
import {user} from './user';
import './Buyers.css'
function UserIDOne({match, location}) {
    const {
        params: {id}
    } = match;
    return (
        <div className="Users faded">
            <p className="User__text">
                <span className="User__text_span">ID: </span>
                {id}
            </p>
            <p className="User__text">
                <span className="User__text_span">Name: </span>
                {user[id - 1].name}
            </p>
            <p className="User__text">
                <span className="User__text_span">Check: </span>
                {user[id - 1].check}
            </p>
            <p className="User__text">
                <span className="User__text_span">Amount: </span>
                {user[id - 1].amount}
            </p>
            <p className="User__text">
                <span className="User__text_span">Total: </span>
                {user[id - 1].total}
            </p>
            <Link  to="/buyers" className="User__link">&#8592; Назад</Link> <Link  to={"/buyer" + [id] + "/further-not"} className="User__link"> Далее &#8594;</Link>
        </div>
    );
}

export default UserIDOne;