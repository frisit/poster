import React from 'react';
// import ReactDOM from 'react-dom';

{/* урок того чувака про формы ничего не отправляется, просто элементы форм */}

class SomeForm extends React.Component {
    state = {
        text1: '',
        text2: '',
        textarea: '',
        select: '',
        checkbox: false,
        radio: ''
    }

    change = (e) => {
        let { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            value = checked
        }

        this.setState({ [name]: value })
    }

    render() {
        const { text1, text2, textarea, select, checkbox, radio } = this.state;
        return (
            <form>
                <h1>Форма</h1>
                <p>По одному из видеоуроков</p>
                <input name="text1" value={text1} onChange={this.change} className="form-control" />
                <br />
                <input name="text2" value={text2} onChange={this.change} className="form-control" />
                <br />
                <textarea name="textarea" value={textarea} cols="30" onChange={this.change} rows="10" className="form-control">
                </textarea>
                <br />
                <select name="select" value={select} onChange={this.change} className="form-control">
                    <option value="1">Значение 1</option>
                    <option value="2">Значение 2</option>
                    <option value="3">Значение 3</option>
                    <option value="4">Значение 4</option>
                </select>
                <br/>
                <input type="checkbox" name="checkbox" checked={checkbox} onChange={this.change}/> Жизнь за Нерзула
                <br/>
                <input type="radio" name="radio" value="1" checked={radio === '1'} onChange={this.change} /> Radio 1
                <br/>           
                <input type="radio" name="radio" value="2" checked={radio === '2'} onChange={this.change} /> Radio 2
                <br/><br/>
                <button className="btn btn-success">Отправить</button>
            </form>
        )
    }

    componentDidUpdate() {
        console.log(this.state)
    }
}

export default SomeForm