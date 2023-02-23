import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  const {confirm, danger, onClick, disabled, children} = props;

  const buttonClass = classNames(
    "button", {
    "button--confirm": confirm, 
    "button--danger": danger 
  })
  // console.log("class test:", props.confirm)
  // console.log("class danger:", props.danger)

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
