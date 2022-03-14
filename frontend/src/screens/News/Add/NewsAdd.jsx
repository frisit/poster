import React from 'react';

import PostNews from './PostNews';

class NewsAdd extends React.Component {
    render() {
        return (
            <div>
                <h1>Добавление новости</h1>
                <PostNews />
            </div>
        )
    }
}

export default NewsAdd