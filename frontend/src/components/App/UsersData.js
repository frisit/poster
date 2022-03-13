import React from 'react';
import axios from 'axios';
import PROJECT_URL from '../Constants/global';

export default class UsersData extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        response: {}
    };

    urlEndPoint = PROJECT_URL;

    componentDidMount() {
        this.getData();
    }

    getTokenFromCookies() {
        let name = 'bearer';
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    getData() {

        let bearerToken = this.getTokenFromCookies();
        console.log('bearer token from cookies', this.getTokenFromCookies());

        let myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer fCEpKfg0K1YrSwN9dQy_" + bearerToken);
        myHeaders.append("Authorization", "Bearer " + bearerToken);



        let requestOptions = {
            headers: {
                method: 'POST',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + bearerToken,
                redirect: 'follow'
            }
        };

        let requestData = {
            method: 'user-data'
        }

        axios
            .post(this.urlEndPoint + "/user-data", requestData, requestOptions
            )
            .then(response => {
                console.log(response);
                this.setState(
                    {
                        response: {
                            name: response.data.name,
                            surname: response.data.surname,
                            email: response.data.email,
                            role: response.data.role,
                            token: response.data.token
                        }
                    }
                );
                console.log('state: ', this.state);
            })
            .catch(error => {
                console.log('response errors: ', error);
            });
    }

    render() {
        let { name, surname, email, role, token } = this.state.response;
        let response = this.state.response;
        return (
            <div>
                {name && (
                    <div style={{ marginBottom: '5px' }}>
                        <p><b>Имя:</b> {name || ''}</p>
                        <p><b>Фамилия:</b> {surname || ''}</p>
                        <p><b>Email:</b> {email || ''}</p>
                        <p><b>Роль:</b> {role || ''}</p>
                    </div>)
                }
                {!name && (
                    <div>
                        Вам необходимо авторизоваться
                    </div>
                )

                }



            </div>


        )
    }


}