import React, { useEffect, useState } from "react";
import { CiBarcode } from "react-icons/ci";
import TopNav from "../../Components/Extra/TopNav";
import { CourseTitle } from "./List";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function Session() {
  document.title = `Morning Courses Dashboard - View Session`;
  const { classType, id } = useParams();
  const [sessionData, setSessionData] = useState({
    topic: "",
    date: new Date(0).toISOString(),
  });
  const [sessionAttendance, setSessionAttendace] = useState([]);
  useEffect(() => {
    init();
  }, []);
  async function init() {
    try {
      let response = await axios.get(`/sessions/data/${id}`);
      setSessionData(response.data.data);
      let res2 = await axios.get(`/attendance/session/${id}`);
      if (res2.data.attendance) {
        let attendance = res2.data.attendance;
        attendance = attendance.sort((a, b) => {
          return (
            new Date(b.markedAt).getTime() - new Date(a.markedAt).getTime()
          );
        });
        setSessionAttendace(attendance);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  let sessionDate = new Date(sessionData.date).getTime();
  let today = new Date();
  let todayEnd = new Date(
    `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, "0")}-${`${
      today.getDate() + 1
    }`.padStart(2, "0")}`
  ).getTime();
  let todayStart = new Date(
    `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(
      2,
      "0"
    )}-${`${today.getDate()}`.padStart(2, "0")}`
  ).getTime();
  return (
    <div className="main">
      <div className="flex items-center justify-between">
        <div className="page-title">{CourseTitle(classType)}</div>
      </div>
      <TopNav active="cls" />
      <div className="mt-6 text-lg font-semibold">
        Session - {sessionData.topic}
      </div>
      <hr className="my-4" />
      {sessionDate < todayEnd && sessionDate > todayStart ? (
        <Link
          to={`/class/${classType}/mark/${id}`}
          className="flex text-sm cursor-pointer items-center justify-center py-6 bg-yellow-100 my-4 flex-col rounded font-semibold"
        >
          <CiBarcode size={36} />
          <div>Mark Attendance</div>
        </Link>
      ) : null}

      <div className="mt-6 text-sm font-semibold">Attendance</div>
      <hr className="my-4" />
      <div>
        {sessionAttendance.map((v, i) => {
          return <AttendanceItem {...v} key={`attendance_item_${i}`} />;
        })}
      </div>
    </div>
  );
}

function AttendanceItem(props) {
  let time = new Date(props.markedAt);
  return (
    <div className="flex my-1 items-center justify-between text-sm">
      <div>
        {props.memberId
          ? `${props.memberId.fullname} (${props.memberId.grade}-${props.memberId.class})`
          : "Deleted User"}
      </div>
      <div className="font-semibold text-xs">
        {time.getFullYear()}-{`${time.getMonth() + 1}`.padStart(2, "0")}-
        {`${time.getDate()}`.padStart(2, "0")}
        {" at "}
        {time.getHours()}:{time.getMinutes()}
      </div>
    </div>
  );
}
