import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointments";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  let dailyAppointments = [];
  let dailyInterviewers = [];

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ])
      .then((all) => {
        const myDays = all[0].data;
        setDays(myDays);
        // console.log("all:",  all[1]);
        const myAppts = all[1].data;
        setAppointments(myAppts);
        const myInterviewers = all[2].data;
        setInterviewers(myInterviewers)
      });
  }, []);

  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
  };
  const setDay = (day) => {
    setState(prev => ({ ...prev, day }));
  };
  const setAppointments = (appointments) => {
    setState(prev => ({ ...prev, appointments }));
  };
  const setInterviewers = (interviewers) => {
    setState(prev => ({ ...prev, interviewers }));
  };

  dailyAppointments = getAppointmentsForDay(state, state.day);

  dailyInterviewers = getInterviewersForDay(state, state.day)

  const schedule = dailyAppointments.map(appointment => {
    // console.log("appt:", appointment);
    const interview = getInterview(state, appointment.interview)

    return (<Appointment
      key={appointment.id}
      interview={interview}
      interviewers={dailyInterviewers}
      {...appointment}
    />);
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList
          days={state.days}
          day={state.day}
          onChange={setDay}
        /></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
