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
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });
  }, []);

  const setDay = (day) => {
    setState(prev => ({ ...prev, day }));
  };

  dailyAppointments = getAppointmentsForDay(state, state.day);

  dailyInterviewers = getInterviewersForDay(state, state.day);

  const bookInterview = (id, interview) => {
    console.log("in bookInterview:", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const apptURL = `/api/appointments/${id}`;
    // console.log(apptURL)
    return axios.put(apptURL, { interview })
      .then(response => {
        console.log("done with put");
        setState({ ...state, appointments });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const apptURL = `/api/appointments/${id}`;
    return axios.delete(apptURL, null)
      .then(() => {
        console.log("done with put");
        setState({ ...state, appointments });
      });
  };

  const schedule = dailyAppointments.map(appointment => {
    // console.log("appt:", appointment);
    const interview = getInterview(state, appointment.interview);

    return (<Appointment
      {...appointment}
      key={appointment.id}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
        <Appointment
          key="last"
          time="5pm" />
      </section>
    </main>
  );
}
