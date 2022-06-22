import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

function InterviewerList(props) {

    const interviewersArr = props.interviewers;
    let JSXArr = interviewersArr.map(item =>
        <InterviewerListItem
            key={item.id}
            name={item.name}
            avatar={item.avatar}
            selected={props.value === item.id}
            // setInterviewer={event => props.setInterviewer(item.id)} />
            setInterviewer={props.onChange ? props.onChange.bind(null, item.id) : () => { }} />
    )

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {JSXArr}
            </ul>

        </section>
    )
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};

export default InterviewerList;