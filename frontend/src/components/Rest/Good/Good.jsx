import React from 'react';
import axios from 'axios';

class Good extends React.Component
{

    handleClicAxiosMessage()
    {
        axios
            .post("http://poster.local/good", {}, {
                headers: {
                    Authorization: "Bearer fCEpKfg0K1YrSwN9dQy_",
                }
            })
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

    render(){
        return(
            <div>
                <h1>Good</h1>
                <a href="" class="btn">Get message</a>
            </div>
        );
    }
}

export default Good