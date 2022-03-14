import React from 'react';
import axios from 'axios';

{/* Ваааще не помню откуда нарыл, вроде бы, сам писал по кускам */ }

class PostNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: '',
            formData: {
                formName: '',
                formContent: '',
                formCategory: ''
            }
        }

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.postOneNews = this.postOneNews.bind(this);
    }


    // handleChange = event => {
    //     this.setState({ value: event.target.value });
    // }

    handleSubmit(event) {
        this.postOneNews()
        console.log(this.state)
        event.preventDefault()
        this.setState({
            formName: '',
            formContent: '',
            formCategory: '',
            success: 'Сообщение отправлено'
        })
    }

    change = (event) => {
        let { name, value, type } = event.target

        this.setState({
            [name]: value
        })
    }

    postOneNews = () => {
        const { formName, formContent, formCategory } = this.state
        console.log('formmmm: ' + formName)
        axios
            .post("http://backend.poster/news", {
                title: formName,
                content: formContent,
                category: formCategory
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        // может есть смысл эти переменные указать напрямую в state как в файле SomeForm
        const { formName, formContent, formCategory } = this.state
        const success = this.state.success

        return (
            <div>
                {/* форму авторизации бери здесь getbootstrap.com/docs/4.5/components/forms */}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Название</label>
                        <input
                            className="form-control"
                            type="text"
                            name="formName"
                            value={formName}
                            onChange={this.change}
                        />
                    </div>
                    <div className="form-group">
                        <label>Контент</label>
                        <input
                            className="form-control"
                            type="text"
                            name="formContent"
                            value={formContent}
                            onChange={this.change}
                        />

                    </div>
                    <div className="form-group">
                        <label>Категория</label>
                        <input
                            className="form-control"
                            type="text"
                            name="formCategory"
                            value={formCategory}
                            onChange={this.change}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Отправить</button>
                    <br />
                    <span>{success}</span>
                </form>


            </div>
        )
    }

    // // выводит консоль лог при любом вводе чего-нибудь в формы 
    // componentDidUpdate() {
    //     console.log(this.state)
    // }
}

export default PostNews