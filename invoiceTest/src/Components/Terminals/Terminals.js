import React, { Component } from "react"
import './Terminals.css'


const ListRemove = (props) => {
    return(
        <div className="list__box">
            <button className="list__btn" onClick={ ()=> props.handleClick()} >{props.label}</button>
        </div>
    )
}
const ListText = (props) => {
    return(
        <div className="list__text">{props.text}</div>
    )
}
const Post = (props) => {
    return(
        <li className="list__item faded">
            <ListText text={props.name}/>
            <ListText text={props.description}/>
            <ListRemove label="Удалить" handleClick={props.removeList}/>
        </li>
    )
}
const PostList = (props) => {
    return(
        <ul className="list">
            {
                props.postList.map((item, index)=>
                    <Post key = {index}
                        name={item.name}
                        description={item.description}
                        removeList ={() => props.removeList(index)}
                    />
                )
            }
        </ul>
    )
}

class Terminals extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            list: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addList = this.addList.bind(this);
        this.removeList = this.removeList.bind(this);
    }
    handleChange = (event)  => {
        if(event.target.name === 'name') {
            this.setState({name: event.target.value});
        } else if (event.target.name === 'description'){
            this.setState({description: event.target.value});
        }
    }
    addList = (event) => {
        event.preventDefault();
        const {name, description} = this.state;
        if(name && description) {
            this.setState({
                list: [...this.state.list,
                    {
                        name:  this.state.name,
                        description: this.state.description,
                    }
                ],
                name: '', description: '',
            });
        }
    } 
    componentWillMount () {
        const itemsList = localStorage.getItem('items');
        if(itemsList) {
            this.setState({
                list: JSON.parse(localStorage.getItem('items'))
            });
        }
        
    }
    componentDidUpdate () {
        localStorage.setItem('items', JSON.stringify(this.state.list))
    }
    removeList = (index) =>{
        const list = this.state.list.filter((e, idx) => idx !== index);
        this.setState({list});
    }
    render() {
        return (
            <section className="Terminals faded">
                <form className="Terminals__from" onSubmit={this.addList}>
                    <div className="Terminals__from-box">
                        <span className="Terminals__form-text">Название терминала</span>
                        <input
                            name = "name"
                            type="text" 
                            className="Terminals__from-input" 
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="Terminals__from-box">
                        <span className="Terminals__form-text">Описание</span>
                        <input 
                            name = "description"
                            type="text" 
                            className="Terminals__from-input" 
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button className="Terminals__form-btn">Добавить</button>
                </form>
                <div className="list-container">
                    <PostList
                        name={this.state.name}
                        description={this.state.description}
                        postList = {this.state.list}
                        removeList = {this.removeList}
                    />
                </div>
            </section>
        )
    }
}

export default Terminals;