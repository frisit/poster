import React from 'react';
import classes from './Authmin.css';
import Button from './../UI/Button/Button';
import Input from './../UI/Input/Input';

{/* Урок по локальному курсу Минина */ }

class Authmin extends React.Component {

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div className={classes.Authmin}>
                <h1>Форма авторизации</h1>
                <p>По уроку Минина</p>
                <div>
                    <form onSubmit={this.submitHandler}>
                        <Input
                            label="Email"
                        />

                        <Input
                            label="Пароль"
                            errorMessage={'TEST'}
                        />
                        <Button type="success" onClick={this.loginHandler}>
                            Войти
                        </Button>
                        <br />
                        <Button type="primary" onClick={this.registerHandler}>
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

}

export default Authmin