import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointments";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

// const days = [{
//   id: 1,
//   name: "Monday",
//   spots: 2,
// }, {
//   id: 2,
//   name: "Tuesday",
//   spots: 5,
// }, {
//   id: 3,
//   name: "Wednesday",
//   spots: 0,
// },];

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  let dailyAppointments = [];

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL)
    ])
      .then((all) => {
        const myDays = all[0].data;
        setDays(myDays);
        // console.log("all:",  all[1]);
        const myAppts = all[1].data;
        setAppointments(myAppts);
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

  dailyAppointments = getAppointmentsForDay(state, state.day);

  const mappedAppointments = dailyAppointments.map(appointment => {
    console.log("appt:", appointment);
    return (<Appointment
      key={appointment.id}
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
        {mappedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
