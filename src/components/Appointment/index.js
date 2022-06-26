import React from 'react';
import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Error from './Error';
import { useVisualMode } from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM"
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Appointment(props) {

    const { time, interview, id, interviewers, bookInterview, deleteInterview } = props;

    const init = interview ? SHOW : EMPTY;
    const { mode, transition, back, setMode } = useVisualMode(init);

    let tempMode = mode;

    async function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        setMode(SAVE);
        try {
            await bookInterview(id, interview, tempMode);
            setMode(SHOW);
            return;
        } catch (error) {
            console.log('error')
            setMode(ERROR_SAVE);
            throw error;
            
        }
        
    }

    function deleteHandler() {
        setMode(CONFIRM);
    }

    async function openEditHandler(name, interviewer) {
        setMode(EDIT)
    }

    async function confirmDeleteHandler() {
        console.log('Confirmed')
        setMode(DELETE);
        try {
            await deleteInterview(id);
            setMode(EMPTY);
            return;
        } catch (error) {
            console.log('error')
            setMode(ERROR_DELETE);
            throw error;
            
        }
        
    }

    return (
        <div className="appointment">

            <Header time={time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={interview.student}
                    interviewer={interview.interviewer}
                    onDelete={deleteHandler}
                    onEdit={openEditHandler}
                />
            )}
            {mode === CONFIRM && <Confirm message={"Are you sure?"}
                onCancel={() => setMode(SHOW)}
                onConfirm={confirmDeleteHandler} />}

            {mode === SAVE && <Status message={"Saving"} />}
            {mode === DELETE && <Status message={"Deleting"} />}

            {mode === EDIT && <Form interviewers={interviewers}
                student={interview.student}
                interviewer={interview.interviewer}
                onSave={save}
                onCancel={() => back()} />}

            {mode === CREATE && <Form interviewers={interviewers}
                onSave={save}
                onCancel={() => back()} />}

            {mode === ERROR_SAVE && <Error message={"Could not save"} onClose={() => back()} />}
            {mode === ERROR_DELETE && <Error message={"Could not delete"} onClose={() => back()} />}
        </div>
    )
}

export default Appointment;