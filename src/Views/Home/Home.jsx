import React from "react";
import TopNav from "../../Components/Extra/TopNav";
import { Link } from "react-router-dom";

export default function Home() {
  document.title = `Morning Courses Dashboard`;
  const styles = {
    navItem: `bg-neutral-100 px-8 py-2 font-medium rounded transition-all`,
    classItem: `cursor-pointer bg-neutral-50 h-32 flex items-center justify-center text-2xl font-semibold rounded-md hover:bg-neutral-100 transition-colors`,
  };
  return (
    <div className="main">
      <div className="page-title">Morning Class System</div>
      <TopNav active="cls" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <Link to={"/class/f-ict"} className={styles.classItem}>
          Fundementals of ICT
        </Link>
        <Link to={"/class/web-dev"} className={styles.classItem}>
          Web Designing
        </Link>
        <Link to={"/class/video-edit"} className={styles.classItem}>
          Video Editing
        </Link>
        <Link to={"/class/ms-office"} className={styles.classItem}>
          MS Office
        </Link>
      </div>
    </div>
  );
}
