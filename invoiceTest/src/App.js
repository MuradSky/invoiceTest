import React, { Component } from 'react';
import Login from './Components/Login/Login';
import Sidebar from './Components/Sidebar/Sidebar';
import Terminals from './Components/Terminals/Terminals';
import Buyers from './Components/Buyers/Buyers';
import UserId from './Components/Buyers/UserId';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const NotFound = () => {
    return (
      <div className="NotFound faded">
          <h1 className='NotFound__titile'>404 </h1>
          <p className='NotFound__text' >Page Not Found!</p>
      </div>
    );
  }
  const Button = (props) => {
    return (
      <div className="Button">
          <Link to='/'>
            <button type="button" onClick={props.onClick} className="App__btn">Выйти</button>
          </Link>
      </div>
    );
  }  
class App extends Component{
  constructor() {
    super();
    this.state = {isSuccess: false} 
  }
  componentDidMount() {
    this.setState({isSuccess: JSON.parse(localStorage.getItem('isSuccess'))});
    console.log(localStorage.getItem('isSuccess'))
  }
  handleLogin = (data) => {
    this.setState({isSuccess: true})
    localStorage.setItem('isSuccess', this.state.isSuccess);    
  }
  logOut = () => {
    this.setState({isSuccess: false},()=> localStorage.setItem('isSuccess', false))
  }
  render() {
    return (
      <div className="App">
        <Router >
            { this.state.isSuccess ? <Sidebar/> : null}
            { this.state.isSuccess ? <Button onClick={this.logOut}/> : null}
            <Switch>
              <Route exact 
                path= '/' 
                render={props => (
                  <Login {...props} handleLogin={this.handleLogin}  />
                )}
              />
              <Route exact path='/terminals' component={Terminals}/>
              <Route path='/buyers' component={Buyers} />
              <Route path='/buyer/:id' component={UserId} />
              <Route component={NotFound} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
