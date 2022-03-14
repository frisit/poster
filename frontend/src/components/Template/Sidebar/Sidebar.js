import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

import UsersData from './../../App/UsersData';

const Sidebar = () => {

    let date = new Date();

    return (
        <div className='sidebar'>
            <div className="usersData">
                <UsersData />
            </div>
            <div className="list-group">
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/user/signup'>
                    Регистрация</NavLink>
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/user/login'>
                    Авторизация</NavLink>
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/user/authorized'>
                    Для авторизованных</NavLink>
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/user/user-settings'>
                    Настройки</NavLink>
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/user/logout'>
                    Выход</NavLink>
            </div>
            <br></br>
            <div className="list-group">
                <NavLink exact className="list-group-item list-group-item-action" to='/'>Главная</NavLink>
                <NavLink className="list-group-item list-group-item-action" to='/news/index'>Новости</NavLink>
                <NavLink className="list-group-item list-group-item-action" to='/news/add'>Добавить новость</NavLink>
                <NavLink className="list-group-item list-group-item-action" to='/some-form'>Формы</NavLink>
            </div>


        </div>
    )
}

export default Sidebar