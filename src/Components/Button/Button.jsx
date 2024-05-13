import React from "react";

export default function Button(props) {
  const { className, children, ...other } = props;
  return (
    <div>
      <button {...other} className={`button ${className}`}>
        {children}
      </button>
    </div>
  );
}
export function ErrorButton(props) {
  const { className, children, ...other } = props;
  return (
    <div>
      <button {...other} className={`button-err ${className}`}>
        {children}
      </button>
    </div>
  );
}
