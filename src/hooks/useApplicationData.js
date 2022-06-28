import { useState } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay } from '../helpers/selectors';

export const useApplicationData = function () {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    const dailyAppointments = getAppointmentsForDay(state, state['day']);

    const interviewersForDay = getInterviewersForDay(state, state['day']);

    const setDaysAndAppointmentsAndInterviewers = dataObj => {
        setState(prev => ({
            ...prev, days: dataObj['days'],
            appointments: dataObj['appointments'],
            interviewers: dataObj['interviewers']
        }));
    }

    async function deleteInterview(id) {
        const appointment = {
            ...state.appointments[id],
            interview: null
        }
        const appointments = {
            ...state.appointments,
            [id]: appointment
        }
        try {
            await axios.delete(`/api/appointments/${Number(id)}`);
        } catch (error) {
            throw error['message'];
        }
        let temp = { ...state };
        let tempDayIndex = temp.days.findIndex(item => item.name === state.day);
        console.log(tempDayIndex);
        console.log(temp['days'][tempDayIndex]);
        temp['days'][tempDayIndex].spots++;
        setState({ ...state, appointments, days: temp['days'] });
    }

    async function bookInterview(id, interview, mode = 'SAVE') {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        try {
            await axios.put(`/api/appointments/${id}`, { interview });
        } catch (error) {
            throw error['message'];
        }
        let temp = { ...state };
        let tempDayIndex = temp.days.findIndex(item => item.name === state.day);
        if (mode !== 'EDIT') {
            temp['days'][tempDayIndex].spots--;
        }
        setState({ ...state, appointments, days: temp['days'] });
    }

    async function editInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        try {
            await axios.put(`/api/appointments/${id}`, { interview });
        } catch (error) {
            throw error['message'];
        }
        setState({ ...state, appointments });
    }

    const setDay = day => {
        setState(prev => ({ ...prev, day: day }))
    }

    return { state, setDay, bookInterview, deleteInterview, editInterview, setDaysAndAppointmentsAndInterviewers, interviewersForDay, dailyAppointments, setState }

}

