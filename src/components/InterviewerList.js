import React from "react";
import propTypes from 'prop-types';
import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

function InterviewerList(props) {
  const {interviewers, interviewer, onChange} = props;
  const list = interviewers.map(eachInterviewer => {
    return (<InterviewerListItem
      key={eachInterviewer.id}
      id={eachInterviewer.id}
      name={eachInterviewer.name}
      avatar={eachInterviewer.avatar}
      selected={interviewer === eachInterviewer.id}
      setInterviewer={() => onChange(eachInterviewer.id)}
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
