import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: []
  });

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

  const updateDaySpots = (direction) => {
    let updatedDays = state.days;
    console.log(state);

    for (let day of state.days) {
      if (day.name === state.day) {
        direction ? day.spots++ : day.spots--;
        return updatedDays;
      }
    }
    console.log("didn't find it, returning empty array");
    return [];
  };

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
        const days = updateDaySpots(false);
        setState({ ...state, appointments, days });
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
        console.log("done with delete");
        const days = updateDaySpots(true);
        setState({ ...state, appointments, days });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}