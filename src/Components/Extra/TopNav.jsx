import React from "react";
import { Link } from "react-router-dom";

export default function TopNav(
  props = {
    active: "",
  }
) {
  const styles = {
    navItem: `bg-neutral-100 px-8 py-2 font-medium rounded transition-all`,
  };
  return (
    <div className="flex gap-2 flex-wrap my-6">
      <Link to={"/"} className={`${styles.navItem} ${props.active === "cls" ? "!bg-neutral-900 text-neutral-50" : ""}`}>
        Classes
      </Link>
      <Link
        to={"/members"}
        className={`${styles.navItem} ${props.active === "mem" ? "!bg-neutral-900 text-neutral-50" : ""}`}
      >
        Members
      </Link>
      <Link
        to={"/reports"}
        className={`${styles.navItem} ${props.active === "rep" ? "!bg-neutral-900 text-neutral-50" : ""}`}
      >
        Reports
      </Link>
    </div>
  );
}
