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

  const updateSpots = (state, appointments) => {
    const daysObj = state.days.find(d => d.name === state.day);
    let spots = 0;

    for (const id of daysObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    };
    const day = { ...daysObj, spots };
    return state.days.map(d => d.name === state.day ? day : d);
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const apptURL = `/api/appointments/${id}`;
    return axios.put(apptURL, { interview })
      .then(response => {
        const days = updateSpots(state, appointments);
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
        const days = updateSpots(state, appointments);
        setState({ ...state, appointments, days });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}