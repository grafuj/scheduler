

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

export function getInterview(state, interview) {
  console.log("state:", state, "interview:", interview)
  // console.log('appts:', state.appointments, "search for:", interview);
  // const myInterview = { student: "Greg", interviewer: { id: 1, name: "Sarah", avatar: "URL:" } };

  // if(interview === undefined) {
  //   return null;
  // }



  // if(state.appointments.interview.student === interview.student &&
  //   state.appointments.interview.interviewer === interview.interviewer) {
  //     //set student
  //     myInterview = state.appointments.interview.student
  //     //set interviewer
  //     const myInterID = interview.interviewer;
  //     myInterview = state.interviewers[myInterID];
  //   }

  // // console.log('my interview', myInterview);
  // return myInterview;


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