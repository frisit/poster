import React from 'react';
import axios from 'axios';
import PROJECT_URL from '../../../components/Constants/global';

class NewsIndex extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickSentMessage = this.handleClickSentMessage.bind(this);
        this.state = {
            // одна запись
            one_string: [],

            // все записи
            news: [],

            // случайное число для обновления компонента
            message: ''
        };
    }

    urlEndPoint = PROJECT_URL;

    getNews() {
        axios
            .get(this.urlEndPoint + "/news")
            .then(response => {
                console.log(response)
                this.setState(
                    {
                        // записываем в массив информацию из первой записи 
                        one_string: response.data[0],
                        // в объект news записываем полученные данные из response т.е. response.data1
                        news: response.data
                    }
                );
                // записываем в переменную dataa значение массива one_string из объекта state
                let dataa = this.state.one_string;
                this.setState({
                    d_id: dataa.id,
                    d_title: dataa.title,
                    d_content: dataa.content,
                    d_category: dataa.category
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClickSentMessage() {
        axios
            // .post(this.urlEndPoint, { title: 'react', content: 'react', category: 'react' })
            .post(this.urlEndPoint + "/news", { title: 'react', content: 'react', category: 'react' })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        this.getNews();
    }

    componentDidMount() {
        this.getNews();
    }

    render() {
        const { message } = this.state;
        return (
            <div className="index">
                <h1>Записи</h1>

                <button className="btn btn-primary" onClick={this.handleClickSentMessage}>Отправить сообщение</button>
                <br /><br />
                <div className="index">
                    <div>
                        <hr />
                        <p>id: {this.state.d_id}</p>
                        <p>Title: {this.state.d_title}</p>
                        <p>Content: {this.state.d_content}</p>
                        <p>Category: {this.state.d_category}</p>

                        <hr />
                    </div>

                    <div>
                        <table className="table table-bordered table-striped table-sm">
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>Title</td>
                                    <td>Content</td>
                                </tr>
                                {
                                    this.state.news.map((data) =>
                                        <tr>
                                            <td>{data.id} </td>
                                            <td>{data.title} </td>
                                            <td>{data.content}</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}

export default NewsIndex