import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from "react";

function Form(props) {

    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState(null);

    const { interviewers, onCancel } = props;

    if (interviewer !== null && interviewer['id']) setInterviewer(interviewer.id);

    const inputOnChangeHandler = event => {
        setError(null);
        setStudent(event.target.value)
    };

    const reset = () => { setStudent(''); setInterviewer(null) };

    const cancel = () => { reset(); onCancel(); }

    const submitHandler = event => {
        event.preventDefault();
    }

    function validate() {
        if (student === "") {
            setError("Student name cannot be blank");
            return;
        }
        if (interviewer === null) {
            setError("Please select an interviewer");
            return;
        }
        props.onSave(student, interviewer);
    }

    const onSaveHandler = () => {
        validate();
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={submitHandler}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={student}
                        onChange={inputOnChangeHandler}
                        data-testid="student-name-input"
                    />
                    <section data-testid='error' className="appointment__validation">{error}</section>
                </form>
                <InterviewerList
                    value={interviewer}
                    interviewers={interviewers}
                    onChange={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={onSaveHandler}>Save</Button>
                </section>
            </section>
        </main >

    )
}
//onSave && onSave.bind(null, student, interviewer)
export default Form;