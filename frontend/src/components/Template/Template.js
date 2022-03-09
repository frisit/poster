import React from 'react';
import './Template.css';
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';


const Template = () => {
    return (
        <div className='template'>
            <Header />
            <Sidebar />
            <Content />
        </div>
    )
}

export default Template