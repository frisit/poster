import React from 'react';

{/* Ваааще не помню откуда нарыл... */}

class PostNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: 'test' }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Отправленное имя: ' + this.state.value);


        event.preventDefault();
    }



    render() {
        const textNews = this.state.value;
        var inputText = '';

        return (
            <div>
                {/* форму авторизации бери здесь getbootstrap.com/docs/4.5/components/forms */}
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Название</label>
                        <input type="text" name="inputText" class="form-control" ></input>
                    </div>
                    {/*
                    <div class="form-group">
                        <label for="exampleInputPassword1">Контент</label>
                        <input type="text" class="form-control" ></input>
                    </div>
                    */}
                    <button type="submit" class="btn btn-primary">Отправить</button>
                </form>
                {textNews}

            </div>
        )
    }
}

export default PostNews