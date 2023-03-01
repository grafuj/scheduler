import React from "react";
import propTypes from 'prop-types';
import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

function InterviewerList(props) {

  const list = props.interviewers.map(interviewer => {
    return (<InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}
      setInterviewer={() => props.onChange(interviewer.id)}
    />);
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>);
}

InterviewerList.propTypes = {
  interviewers: propTypes.array.isRequired
}

export default InterviewerList;
