import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

// import Appointment from "components/Appointment";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const error_save_msg = "There was an error saving the interview 😱";
const ERROR_DELETE = "ERROR_DELETE";
const error_delete_msg = "There was an error deleting the interview 😱";
const saveLoading = "Saving ...";
const deleteLoading = "Deleting ...";
const deleteConfirmation = "Are you sure you want to delete?";

export default function Appointment(props) {
  const { interview, time, interviewers, bookInterview, id, cancelInterview } = props;

  //get mode, transition and back from useVisualMode(does interview have value?)
  const initialMode = interview ? SHOW : EMPTY;

  const { mode, transition, back } = useVisualMode(initialMode);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        console.error(error);
        transition(ERROR_SAVE, true, 1);
      });
  };

  const onEdit = () => {
    transition(EDIT);
  };

  const onDelete = () => {
    transition(CONFIRM);
  };

  const confirmDelete = () => {
    transition(DELETE);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        // console.error(error);
        transition(ERROR_DELETE, true, 2);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message={saveLoading}
        />
      )}
      {mode === DELETE && (
        <Status
          message={deleteLoading}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={deleteConfirmation}
          onCancel={back}
          onConfirm={confirmDelete}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={error_save_msg}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={error_delete_msg}
          onClose={back}
        />
      )}
    </article>
  );
}
