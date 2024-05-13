import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { Link, useParams } from "react-router-dom";
import TopNav from "../../Components/Extra/TopNav";
import axios from "axios";
import Loading from "../../Components/Extra/Loading";

export default function SessionList() {
  document.title = `Morning Courses Dashboard - Session List`;
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { classType } = useParams();
  useEffect(() => {
    init();
  }, []);
  async function init() {
    setLoading(true);
    try {
      let response = await axios.get(`sessions/find/${classType}`);
      if (response.data.data) {
        let items = response.data.data;
        items.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setItemList(items);
      }
    } catch (error) {
      console.log("SDDS");
    }
    setLoading(false);
  }
  return (
    <div className="main">
      <div className="page-title">{CourseTitle(classType)}</div>
      <TopNav active="cls" />
      <div className="flex items-center justify-between">
        <div className="mt-6 text-lg font-semibold">Sessions</div>
        <Link to={`/class/${classType}/add-session`}>
          <Button>Create Session</Button>
        </Link>
      </div>
      <hr className="my-4" />
      <div className="mt-8">
        {itemList.map((item, i) => {
          return <ListItem {...item} key={`list_item_${i}`} />;
        })}
        {loading ? (
          <div className="h-[40vh] w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : null}
        {loading === false && itemList.length === 0 ? (
          <div className="h-[40vh] w-full flex items-center justify-center">
            No Sessions Found
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ListItem(props) {
  const { classType } = useParams();
  return (
    <Link to={`/class/${classType}/view/${props._id}`}>
      <div className="px-6 my-2 py-8 rounded bg-neutral-100">
        <div className="font-semibold text-lg">{props.topic}</div>
        <div className="text-xs">{props.date}</div>
      </div>
    </Link>
  );
}

export function CourseTitle(classType) {
  return classType === "f-ict"
    ? "Fundamentals of ICT"
    : classType === "web-dev"
    ? "Web Developement"
    : classType === "video-edit"
    ? "Video Editing"
    : classType === "ms-office"
    ? "MS Office"
    : null;
}
