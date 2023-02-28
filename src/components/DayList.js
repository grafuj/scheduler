import React from "react";
import "components/DayListItem";

import DayListItem from "components/DayListItem";

export default function DayList({ days, day, onChange }) {
  //const {days, day, onChange} = props

  const list = days.map(dayOfWeek => {
    return (<DayListItem
      key={dayOfWeek.id}
      name={dayOfWeek.name}
      spots={dayOfWeek.spots}
      selected={dayOfWeek.name === day}
      setDay={onChange}
    />);
  });

  return (
    <ul >
      {list}
    </ul>);
}
