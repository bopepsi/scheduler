import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {

    let days = props.days;

    let arr = days.map(item => {
        return <DayListItem
            key={item.id}
            name={item.name}
            spots={item.spots}
            selected={item.name === props.value}
            setDay={props.onChange}
        />
    })

    return (
        <ul>
            {arr}
        </ul>
    )
}

export default DayList;