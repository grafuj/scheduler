

export function getAppointmentsForDay(state, day) {
  //returns array of appointments for day
  const finalArray = [];
  // console.log(day);
  // console.log("state:", state);

  const filterForDay = state.days.find(elem => {
    // console.log("elem:", elem);
    return (elem.name === day);
  });

  // console.log("filterforday:", filterForDay);

  if (filterForDay === undefined) {
    return [];
  }

  for (const apptID of filterForDay.appointments) {
    // console.log("Selection:", apptID, filterForDay, state.appointments);

    if (state.appointments[apptID] && state.appointments[apptID].id === apptID) {
      finalArray.push(state.appointments[apptID]);
    }
  }

  // console.log("FA:", finalArray);
  return finalArray;
}

//returns array of interviewers for day
export function getInterviewersForDay(state, day) {
  const finalArray = [];
  // console.log(day);
  // console.log("state:", state);

  const filterForDay = state.days.find(elem => {
    // console.log("elem:", elem);
    return (elem.name === day);
  });
  // console.log("filterforday:", filterForDay);

  if (filterForDay === undefined) {
    return [];
  }

  for (const interviewerID of filterForDay.interviewers) {
    // console.log("Selection:", interviewerID, filterForDay, state.appointments);
    if (state.interviewers[interviewerID] && state.interviewers[interviewerID].id === interviewerID) {
      finalArray.push(state.interviewers[interviewerID]);
    }
  }

  // console.log("FA:", finalArray);
  return finalArray;
}


export function getInterview(state, interview) {
  // console.log("state:", state, "interview:", interview)

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
  }
  
}