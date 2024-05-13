import React from "react";

export default function Modal(
  props = {
    title: "",
    active: false,
    close: () => {},
  }
) {
  const { active, className, children, close, ...other } = props;
  return (
    <div className={`modal-container ${active ? "active" : ""}`}>
      <div className="modal">
        <div className="flex justify-between">
          <div className="modal-title">{props.title}</div>
          <div
            onClick={() => {
              if (close) {
                close();
              }
            }}
            className="bg-red-400 cursor-pointer w-6 h-6 flex items-center justify-center rounded-full text-lg text-white"
          >
            &times;
          </div>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
