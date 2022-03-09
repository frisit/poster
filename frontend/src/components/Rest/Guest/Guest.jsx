import React from 'react';
import axios from 'axios';

import AlertBlock from '../../UI/Blocks/AlertBlock/AlertBlock';

class Guest extends React.Component {
    constructor(props) {
        super(props);

        this.handleClicAxiosMessage = this.handleClicAxiosMessage.bind(this)

        this.state = {
            message: []
        };
    }


    handleClicFetchMessage() {
        var requestOptions = {
            method: 'GET'
        };

        fetch("http://poster.local/guest", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    handleClicAxiosMessage() {
        axios
            .post("http://poster.local/guest")
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



    render() {
        return (
            <div>
                <h1>Guest</h1>
                <button onClick={this.handleClicFetchMessage} className="btn btn-primary">Get message with fetch</button>
                <br />
                <br />
                <button onClick={this.handleClicAxiosMessage} className="btn btn-primary">Get message with axios</button>
                <br />
                <br />
                <div className="diff">
                    {/* выведется текс*/}
                    {this.state.message.message == null ? null : <AlertBlock status={this.state.message.status} message={this.state.message.message} />}
                </div>


            </div>
        );
    }
}

export default Guest