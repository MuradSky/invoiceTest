import React, {Component} from 'react';
import LoginInput from './LoginInput';
import LoginButton from './LoginButton';
import user from '../user.svg';
import './Login.css'
class Login extends Component{
    userData;

    constructor(props){
        super(props);
        this.state = { 
            login: '',
            password: '',
            getData: '',
            passError: false,
        };     
    }
    
    handleChange = (event)  => {
        const password = event.target.value;
        const passValid = this.passValid (password);
        this.setState({
            [event.target.name]: event.target.value,
            passError: passValid
        })
    }
    passValid = (password) =>{
        const passReg = /.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/;
        return passReg.test(password);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://api.github.com/users/${this.state.login}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    getData: data,
                })
                this.handleSuccessfulAuth(data.data)
                const login = this.state.login;
                const getData = this.state.getData;
                if(getData.login == login ) {
                    this.props.history.push('/terminals')
                      
                } 
            });
    }
    handleSuccessfulAuth(data) {
        this.props.handleLogin(data)
        const login = this.state.login;
        const getData = this.state.getData;
        if(getData.login == login ) {
            this.props.history.push('/terminals')
        } 
    }
    componentDidUpdate() {
         
        localStorage.setItem('user', JSON.stringify(this.state.getData)); 
    }
    render() {
        const isFormError = this.state.passError ;
        return (
            <div className="Login faded">
                <div className="Login__icon">
                    <img src={user} className="Login__img" alt="User" />
                </div>
                <form className="form" onSubmit={this.handleSubmit}  >
                    <LoginInput 
                        type={'text'}
                        name={'login'}
                        value = {this.state.login}
                        className={'form__input'}
                        placeholder={'Логин'}
                        onChange={this.handleChange}
                    />
                    <LoginInput 
                        type={'password'}
                        name={'password'}
                        value = {this.state.password}
                        className={'form__input'}
                        placeholder={'Пароль'}
                        onChange={this.handleChange}
                    />
                    <LoginButton 
                        text={"Авторизоваться"}
                        className = {'form__btn'}
                        disabled= {!isFormError}
                        handleSuccessfulAuth={this.handleSuccessfulAuth}
                    />
                </form>
            </div>
          );
    }
}

export default Login;
