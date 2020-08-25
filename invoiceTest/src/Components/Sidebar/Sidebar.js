import React, { Component } from 'react';
import user from '../user.svg';
import './Sidebar.css'
import { Link } from "react-router-dom";

class Sidebar extends Component{
        container = React.createRef();
        state = {
            user: '',
            isSideClick : false, 
        }

    componentDidMount() {
        this.setState({user: JSON.parse(localStorage.getItem('user')),});
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mouedown', this.handleClickOutside);
    }
    handleClickOutside = (event) => {
        if(this.container.current && !this.container.current.contains(event.target)) {
            this.setState({ isSideClick: false});
        }
    }
    handleClick = ()=> {
        this.setState( state => { 
            return {
                isSideClick: !state.isSideClick,
            };
        })
    };
  render() {
    return (
        <div ref={this.container}>
            <button className= "Sidebar-btn"  onClick={this.handleClick} >
                <span className="Sidebar-btn__item"></span>
            </button>
            <menu className={this.state.isSideClick ? "Sidebar Sidebar_show": "Sidebar" } >
                <div className="Sidebar__inner">
                    <Link to="/" className="Sidebar__user">
                        <img src={this.state.user? this.state.user.avatar_url : user} alt="user" className="Sidebar__img"/>
                    </Link>
                    <p className='Sidebar__name'>{this.state.user? this.state.user.login : ''}</p>
                    <ul className="links">
                        <li className="links__item">
                            <Link to='/terminals' className='links__link'>Терминалы</Link>
                        </li>
                        <li className="links__item">
                            <Link to='/buyers' className='links__link'>Покупатели</Link>
                        </li>
                        <li className="links__item">
                            <Link to='/not-found' className='links__link'>Not Found</Link>
                        </li>
                    </ul>
                    <div className="Sidebar__footer">Copyright © 2020</div>
                </div>
            </menu>
        </div>  
      );
  }
}

export default Sidebar;
