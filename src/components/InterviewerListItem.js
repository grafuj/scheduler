import React from "react";
import "components/InterviewerListItem.scss";

import classNames from "classnames";


export default function InterviewerListItem(props) {
  const avatar = props.avatar;
  const name = props.name;
  const setInterviewer = props.setInterviewer;

  const ILIClass = classNames(
    "interviewers__item", {
    "interviewers__item--selected": props.selected === true,
  });

  return (
    <li className={ILIClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {props.selected && name}
    </li>
  );
}
