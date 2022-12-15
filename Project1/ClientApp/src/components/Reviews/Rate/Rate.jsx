import React from 'react';
import './rate.scss';


export default function Rate() {

    return (
        <div className="rate_list">
            <div className="rate">
                <div className="track_bar">
                    <Progress done="5"/>
                </div>
                <div className="rate_bar">
                    <Progress done="4"/>
                </div>
                <div className="rate_bar">
                    <Progress done="3"/>
                </div>
                <div className="rate_bar">
                    <Progress done="2"/>
                </div>
                <div className="rate_bar">
                    <Progress done="1"/>
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
        <div className="rate-progress">
            <div className="rate-progress-done" style={style}>
                {done}
            </div>
        </div>

    )

};
