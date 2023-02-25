import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";

// import Appointment from "components/Appointment";
import "./styles.scss";


export default function Appointment(props) {
  const { interview, time, } = props;

  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? <Show student={interview.student} interviewer={interview.interviewer.name} /> : <Empty />}
    </article>
  );
}
