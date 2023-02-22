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
    }
  )

  return (
    <li className={DLIClass} onClick={() => setDay(name)}>
      <h2 className="text--regular setDay">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}