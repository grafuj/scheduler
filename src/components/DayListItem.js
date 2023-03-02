import React from "react";
import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem({name, setDay, selected, spots}) {
  // const {name, setDay} = props;

  const DLIClass = classNames(
    "day-list__item", {
    "day-list__item--selected": selected === true,
    "day-list__item--full": spots === 0
  });
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots"
    }
    if (spots === 1) {
      return "1 spot"
    }
    return `${spots} spots`;
  };

  return (
    <li className={DLIClass} data-testid="day" onClick={() => setDay(name)}>
      <h2 className="text--regular setDay">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}