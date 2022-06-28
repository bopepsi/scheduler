import React, { useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import {  getInterview } from '../helpers/selectors';
import { useApplicationData } from "hooks/useApplicationData";

function Application(props) {

  const { state, setDay, bookInterview, deleteInterview, editInterview, setDaysAndAppointmentsAndInterviewers, interviewersForDay, dailyAppointments} = useApplicationData();

  useEffect(() => {
    (async () => {
      try {
        const responseDays = await axios.get('/api/days');
        const responseAppointments = await axios.get('/api/appointments');
        const responseInterviewers = await axios.get('/api/interviewers');

        setDaysAndAppointmentsAndInterviewers({
          days: responseDays['data'],
          appointments: responseAppointments['data'],
          interviewers: responseInterviewers['data']
        });

      } catch (error) {
        throw error;
      }
    })();
  }, [setDaysAndAppointmentsAndInterviewers])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>

      <section className="schedule">

        {dailyAppointments.map((item) => {
          const interview = getInterview(state, item.interview);
          return < Appointment key={item.id} {...item} interview={interview} day={state.day}
            interviewers={interviewersForDay} bookInterview={bookInterview} deleteInterview={deleteInterview}
            editInterview={editInterview} />
        })}

        <Appointment key="last" time="5pm"  day={state.day}
          interviewers={interviewersForDay} bookInterview={bookInterview} deleteInterview={deleteInterview}
          editInterview={editInterview} />

      </section>
    </main>
  );
}

export default Application;