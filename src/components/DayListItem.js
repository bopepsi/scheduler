import React from "react";
import './DayListItem.scss';

export default function DayListItem(props) {

    return (
        <li onClick={() => props.setDay(props.name)}
            className={`day-list__item ${props.selected ? 'day-list__item--selected' : ''} ${props.spots === 0 ? 'day-list__item--full' : ''}`}>
            <h2 className="text--regular">{props.name}</h2>
            {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
            {props.spots === 1 && <h3 className="text--light">1 spot remaining</h3>}
            {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
        </li>
    );
}