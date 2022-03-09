import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    let statuss = []
    this.state = {
      obb: {
        book: "1984",
        author: "Skorseze"
      },
      news: {},
      firstLine: "",
      twoLine: "",
      someText: "some text"
    };
  }

  conlog = () => {

    return (
      <div>
        {console.log("some text")}
        <br>test</br>
      </div>
    )
  }

  //  news = this.state.news[1]

  //  newsdiv = news.map((data) => { <li>{data.id}</li>})

  newsread = () => {
    return (
      <p>newsread</p>
    )
  }

  componentDidMount() {
    axios
      .get("http://poster.local/news")
      .then(response => {
        let data = response.data;
        let statuss = response.data;
        this.setState(
          { news: response.data }
        );
        let dataa = response.data[1];
        console.log(response.data);
        console.log(dataa)
        this.setState({
          data: response.data,
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

  render() {
    const newses = this.state.news
    const testis = new Map(Object.entries(newses))

    const navus = this.state.news[1]
    const tilda = [1, 2, 3]

    
    return (
      <div>
        <h1>Let's start!</h1>
        <p> id: {this.state.d_id} </p>
        <p> Title: {this.state.d_title} </p>
        <p> Content: {this.state.d_content} </p>
        <p> Category: {this.state.d_category} </p>
        <button onClick={this.conlog}>Start</button>
        {
          tilda.map((data) => <li>{data}</li>)
        }
        <p> мапинг newses не проходит почему-то</p>
        {
          // newses.map((data) => <li>{data.id}</li>)
        }

        {
        }
          <p>Нужно как-то вывести все данные из newses в div</p>
        {
        }
        <br></br><br></br><br></br><br></br><br></br>
      </div>

    );
  }
}

export default App;