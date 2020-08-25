import React, { Component } from 'react';
import {user} from './user';
import { Link } from "react-router-dom";
import './Buyers.css'
const TableCell = (props) => {
    return(
        <span className={props.className}>{props.text}</span>
    );
}
const buyer = user;
const BuyersHead = () => {
    return(
        <div className="table__row">
            <TableCell className='table__heading' text = 'ID покупаетля'/>
            <TableCell className='table__heading' text = 'Имя покупателя'/>
            <TableCell className='table__heading' text = 'Средний чек'/>
            <TableCell className='table__heading' text = 'Количество покупок'/>
            <TableCell className='table__heading' text = 'Общая выручка'/>
        </div>
    );
}
const Buyer = (props) =>{
    return(
        <div className="table__row">
            <span className={props.className}>
                <Link to={"/buyer/" + props.id} className="table__link">{props.id}</Link> 
            </span>
            <TableCell className={props.className} text = {props.name}/>
            <TableCell className={props.className} text = {props.check}/>
            <TableCell className={props.className} text = {props.amount}/>
            <TableCell className={props.className} text = {props.total}/>
        </div>
    );
}
class BuyerList extends Component{
    render() {
        return(
            <>
                {
                this.props.buyer.map((buyer, i) =>
                    <Buyer
                        
                        className={'table__cell'}
                        key={i}
                        id={buyer.id}
                        name={buyer.name}
                        check={buyer.check}
                        amount={buyer.amount}
                        total={buyer.total} 
                    />
                )
                }
            </>
        )
    }
}
class Search extends Component{
    state = {value : ''};
    render() {
        return (
          <div className="Search">
            <input
              onChange={e => this.props.search(e.target.value)}
              type="text"
              placeholder="Search here..."
              className="Search__input"
            />
          </div>
        );
      }
}

class Buyers extends Component{
    state = {
        users : buyer,
        filtered: []
    }
    search = search => {
        let currentUsers = [];
        let newList = [];
        if(search !== "" ) {
            currentUsers = this.state.users;
            newList = currentUsers.filter(user =>{
                const lc = user.name.toLowerCase();
                const filter = search.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.state.users;
        }
        this.setState({filtered: newList})
        console.log(search);
    };
    componentDidMount() {
        this.setState({filtered: this.state.users});
    }
    render() {
        console.log(this.state.users);
        return (
            <section className="Buyers faded">
                <Search search={this.search}/>
                <div className="table" todos={this.state.filtered}>
                    <BuyersHead/>
                    <BuyerList buyer={this.state.filtered}/>
                </div> 
            </section>
        )
    }
}

export default Buyers;