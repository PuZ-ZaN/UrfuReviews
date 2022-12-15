import React from 'react';
import './info.scss';
import Circle from "./Circle/Circle";
import Rate from "./Rate/Rate";
import Criteria from "./Criteria/Criteria";


export default function Info() {

    return (
        <div className="info_title_container">
            <p className="info_title">TRACK TITLE</p>
            <div className="info_view">
                <div className="circle_big">
                    <Circle/>
                </div>
                <div className="ratings">
                    <Rate/>
                    <Criteria/>
                </div>
            </div>

            <div className='card'>
                <div className="review_info">
                    <div className="info">
                        <div>
                            <h2>Пользователь №234</h2>
                        </div>
                        <div><p>Преподаватель: <a href="/review">Шадрин Денис Борисович</a></p>
                            <p>Дата: 04.11.2022</p>
                        </div>
                    </div>

                    <div className="criteria">
                        <div className="blocks">
                            <div className="block">
                                <p>Интерес к предмету: 4</p>
                            </div>
                            <div className="block">
                                <p>Польза от предмета: 3</p>
                            </div>
                            <div className="block">
                                <p>Доступность изложения: 4</p>
                            </div>
                        </div>

                        <div className="rating">
                            <p>Общая оценка: </p>
                        </div>
                    </div>
                </div>

                <div className="review_text">
                    <div className="text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                    <div className='rate'>
                        <input type="image" src="../../public/img/like.png" alt="no img"/>
                        <div className='counter'>
                            <p>+5</p>
                        </div>
                        <input type="image" src="../../public/img/dislike.png" alt="no img"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

