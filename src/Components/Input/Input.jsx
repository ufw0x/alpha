import React from "react";

export default function Input(props = { label: "" }) {
  const { className, label, ...other } = props;
  return (
    <div className="flex flex-col my-2">
      <label className="text-xs mb-1 font-semibold">{label}</label>
      <input
        className={`input ${className}`}
        {...other}
      ></input>
    </div>
  );
}
