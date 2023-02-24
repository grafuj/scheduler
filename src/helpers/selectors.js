

export function getAppointmentsForDay(state, day) {
  //returns array of appointments for day
  const finalArray = [];
  // console.log(day);
  // console.log("state:", state);

  const filterForDay = state.days.find(elem => {
    // console.log("elem:", elem);
    return (elem.name === day);
  });

  console.log("filterforday:", filterForDay);

  if (filterForDay === undefined) {
    return [];
  }

  for (const apptID of filterForDay.appointments) {
    console.log("Selection:", apptID, filterForDay, state.appointments);

    if (state.appointments[apptID] && state.appointments[apptID].id  === apptID) {
      finalArray.push(state.appointments[apptID]);
    }
  }

  console.log("FA:", finalArray);
  return finalArray;
}
