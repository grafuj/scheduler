//returns array of appointments for day
export function getAppointmentsForDay(state, day) {
  const finalArray = [];

  const filterForDay = state.days.find(elem => {
    return (elem.name === day);
  });

  if (filterForDay === undefined) {
    return [];
  }

  for (const apptID of filterForDay.appointments) {
    if (state.appointments[apptID] && state.appointments[apptID].id === apptID) {
      finalArray.push(state.appointments[apptID]);
    }
  }

  return finalArray;
}

//returns array of interviewers for day
export function getInterviewersForDay(state, day) {
  const finalArray = [];

  const filterForDay = state.days.find(elem => {
    return (elem.name === day);
  });

  if (filterForDay === undefined) {
    return [];
  }

  for (const interviewerID of filterForDay.interviewers) {
    if (state.interviewers[interviewerID] && state.interviewers[interviewerID].id === interviewerID) {
      finalArray.push(state.interviewers[interviewerID]);
    }
  }

  return finalArray;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  if (!interviewer) {
    return null;
  }

  return {
    student: interview.student,
    interviewer
  };

}