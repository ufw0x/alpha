import React from "react";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import TopNav from "../../Components/Extra/TopNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CourseTitle } from "./List";

export default function CreateSession() {
  document.title = `Morning Courses Dashboard - Create Session`;
  const params = useParams();
  const { classType } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let dataSet = {
        topic: e.target.topic.value,
        time: e.target.time.value,
        type: params.classType,
      };
      toast.loading("Adding Session", { id: "session-add" });
      await axios.post("/sessions/create", dataSet);
      toast.success("Session Added!", {
        id: "session-add",
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        id: "session-add",
      });
    }
  }
  return (
    <div className="main">
      <div className="flex items-center justify-between">
        <div className="page-title">{CourseTitle(classType)}</div>
      </div>
      <TopNav active="cls" />
      <div className="mt-6 text-lg font-semibold">Create Session</div>
      <hr className="my-4" />
      <form className="mt-6" onSubmit={handleSubmit}>
        <Input label="Topic" name="topic" />
        <Input
          label="Starting Time"
          type="time"
          defaultValue="06:30"
          name="time"
        />
        <div className="mt-4 w-max">
          <Button>Create Session</Button>
        </div>
      </form>
    </div>
  );
}
