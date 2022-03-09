import React from 'react';
import { Route } from 'react-router-dom';
import Index from './../../Index/Index';
import News from './../../News/News';
import Settings from './../../Settings/Settings';
import SomeForm from './../../SomeForm/SomeForm';
import './Sidebar.css';

import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="list-group">
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/rest/guest'>
                    Гость</NavLink>
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/rest/signup'>
                    Регистрация</NavLink>
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/rest/login'>
                    Авторизация</NavLink>
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/rest/good'>
                    Для авторизованных</NavLink>
                <NavLink className="list-group-item list-group-item-action list-group-item-info" to='/rest/logout'>
                    Выход</NavLink>
            </div>
            <br></br>
            <div className="list-group">
                <NavLink exact className="list-group-item list-group-item-action" to='/'>Главная</NavLink>
                <NavLink className="list-group-item list-group-item-action" to='/index'>Индекс</NavLink>
                <NavLink className="list-group-item list-group-item-action" to='/news'>Новости</NavLink>
                <NavLink className="list-group-item list-group-item-action" to='/news-add'>Добавить новость</NavLink>
                <NavLink className="list-group-item list-group-item-action" to='/settings'>Настройки</NavLink>
                <NavLink className="list-group-item list-group-item-action" to='/some-form'>Какая-то форма</NavLink>
                <NavLink className="list-group-item list-group-item-action" to='/authmin'>Authmin минина</NavLink>
                <a href="https://getbootstrap.com/docs/4.5/components/alerts/" className="list-group-item list-group-item-action">
                    Дока по бутстрапу
                    </a>
                <a href="#" className="list-group-item list-group-item-action">Выход</a>
            </div>
            <div className="createdBy">
                <p>Copywrit © 2020</p>
            </div>

        </div>
    )
}

export default Sidebar