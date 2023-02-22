import React from "react";
import "components/DayListItem.scss";

import classNames from "classnames";


export default function DayListItem(props) {
  const name = props.name;
  const setDay = props.setDay;
  const DLIClass = classNames(
    "day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots = (spots) => {
    console.log("current number of spots:", spots);
    if (spots === 0) {
      return "no spots"
    }
    if (spots === 1) {
      return "1 spot"
    }
    return `${spots} spots`;
  };

  return (
    <li className={DLIClass} onClick={() => setDay(name)}>
      <h2 className="text--regular setDay">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}