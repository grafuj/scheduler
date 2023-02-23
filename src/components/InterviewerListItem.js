import React from "react";
import "components/InterviewerListItem.scss";

import classNames from "classnames";


export default function InterviewerListItem(props) {
  const id = props.key;
  const avatar = props.avatar;
  const name = props.name;
  const setInterviewer = props.onChange;

  const ILIClass = classNames(
    "interviewers__item", {
    "interviewers__item--selected": props.selected === true,
  });

  return (
    <li className={ILIClass} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {props.selected && name}
    </li>
  );
}
