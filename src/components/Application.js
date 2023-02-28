import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointments";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    spots
  } = useApplicationData();

  let dailyAppointments = [];
  let dailyInterviewers = [];

  dailyAppointments = getAppointmentsForDay(state, state.day);

  dailyInterviewers = getInterviewersForDay(state, state.day);

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
          spots={spots}
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
