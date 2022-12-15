import React from 'react';
import './criteria.scss';


export default function Criteria() {

    return (
        <div className="criteria_list">
            <div className="criteria">
                <div className="criteria_bar">
                    <p className="criteria_title">Интерес к предмету</p>
                    <Progress done="5"/>
                </div>
                <div className="criteria_bar">
                    <p className="criteria_title">Польза от предмета</p>
                    <Progress done="4"/>
                </div>
                <div className="criteria_bar">
                    <p className="criteria_title">Доступность изложения</p>
                    <Progress done="3"/>
                </div>
            </div>
        </div>
    )
}

const Progress = ({done}) => {
    const [style, setStyle] = React.useState({});

    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: `${done * 19.5}%`
        }

        setStyle(newStyle);
    }, 1000);

    return (
        <div className="criteria-progress">
            <div className="criteria-progress-done" style={style}>
                {done}
            </div>
        </div>

    )

};
