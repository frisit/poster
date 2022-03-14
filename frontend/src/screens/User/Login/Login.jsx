import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


// import { ReactNotifications } from 'react-notifications-component';
// import { store } from 'react-notifications-component';
// import 'animate.css';
// import 'react-notifications-component/dist/theme.css';

import PROJECT_URL from '../../../components/Constants/global';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickAxiosMessage = this.handleClickAxiosMessage.bind(this);
        this.testAuth = this.testAuth.bind(this);
        this.logIn = this.logIn.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: ''
        };
    }

    urlEndPoint = PROJECT_URL;

    logIn() {
        let myHeaders = new Headers();
        myHeaders.append("Cookie", "rest_t=gr7ualsl0ot37p2b8n59pk2g9oi89djl; _csrf-backend=ff68c953cec280bcfde748792ade06a5a78a699cf6cd7cbbef1a31dc3ca0e398a%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22_csrf-backend%22%3Bi%3A1%3Bs%3A32%3A%222KpkuL18jRZVX0vRfSWH3sVgNyaQpl0f%22%3B%7D");

        let formdata = new FormData();
        formdata.append("email", this.state.email);
        formdata.append("password", this.state.password);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://backend.poster/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result);

                if(data.token) {
                    document.cookie = 'bearer=' + data.token;
                }
                console.log('document.cookie: ', document.cookie);
            })
            // TODO: сделать так, чтобы форма авторизации скрывалась, когда пользователь авторизовался
            // TODO: сделать удаление cookies bearer после того, как пользователь разлогинивается
            .then(result => console.log(result))
            .catch(error => console.log('error', error))
            
    }

    handleClickAxiosMessage() {
        axios
            .post(this.urlEndPoint + "/check-auth")
            .then(response => {
                console.log(response)
                this.setState({
                    message: { ...this.state.message, status: response.status },
                    // в объект data записывается информация из response
                    // возможно, лучше было бы записать данные в data в отдельной функции setState
                    data: response
                });
                // записываем в переменную dataa значение массива one_string из объекта state
                this.setState({
                    message: { ...this.state.message, message: response.data.message }
                })
                console.log(this.state)
            })
            // .then(response => {
            // лучше так не делать, а объявить всё через компонент и пропсы, но ради прикола можно))
            // document.getElementsByClassName("diff")[0].innerHTML = <AlertBlock status="200" message="test message" />
            // "<div class='alert alert-primary'> message: " + this.state.message.message + 
            // "<br>" +
            // "status: " + this.state.message.status + "</div>"
            // })
            .catch(error => {
                console.log(error);
            })

    }

    // Проверка авторизации по bearer токену записаному в БД
    // Работает
    testAuth() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer fCEpKfg0K1YrSwN9dQy_");
        myHeaders.append("Cookie", "rest_t=dc1o4ad5rq0e9lcehpq56tshfnhqd19d; _csrf-backend=71b16f95d521ba0f00c617807fafbe478581d80b4e7ccf1f3b0b0ca755895720a%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22_csrf-backend%22%3Bi%3A1%3Bs%3A32%3A%22D-yNwWpa_OA3Z_bSxu3mN3NcK746OZFG%22%3B%7D");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://backend.poster/check-auth", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            // .then(
            //     store.addNotification({
            //         title: "some title",
            //         message: "some message",
            //         type: "success",
            //         container: ["top-right"],
            //         insert: "top",
            //         animationIn: ["animated", "fadeIn"],
            //         animationOut: ["animated", "fadeOut"]
            //     })
            // )
            .catch(error => console.log('error', error));
    }


    // Запись данных в state при редактировании значений текстовых полей
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        // const { email, password } = this.state;
        return (
            <div>
                {/* <p>E-mail:</p>
                <p><input name="email" value={email} onChange={this.handleInputData} type="email" className="form-control" /></p>
                <p>Пароль</p>
                <p><input name="password" value={password} onChange={this.handleInputData} type="password" className="form-control" /></p>
                <a className="btn btn-primary" onClick={this.logIn(email, password)}>Отправить</a> */}

                <h1>Авторизация</h1>
                <p>E-mail:</p>
                <p><input name="email" onChange={this.handleChange} type="email" className="form-control" /></p>
                <p>Пароль</p>
                <p><input name="password" onChange={this.handleChange} type="password" className="form-control" /></p>

                <a onClick={this.logIn} className="btn btn-primary">Войти</a>



                <br />
                <br />
                <a onClick={this.handleClickAxiosMessage} className="btn btn-primary">Get message with axios</a>
                <br />
                <br />
                <a onClick={this.testAuth} className="btn btn-primary">Check auth</a>
            </div>
        );
    }
}

export default Login