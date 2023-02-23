import React from "react";
import "components/DayListItem";

import classNames from "classnames";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const list = props.days.map(day => {
    return (<DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.onChange}
    />);
  });

  return (
    <ul >
      {list}
    </ul>);
}