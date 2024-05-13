import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import TopNav from "../../Components/Extra/TopNav";

export default function Add() {
  document.title = `Morning Courses Dashboard - Add Member`;
  const [Members, setMembers] = useState([
    {
      member_id: "",
      email: "",
      full_name: "",
      barcode: "",
      class: "",
      grade: "",
      whatsapp: "",
      admission_number: "",
      added_by: "",
    },
  ]);
  const styles = {
    navItem: `bg-neutral-100 px-8 py-2 font-medium rounded transition-all`,
  };
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let dataSet = {
        barcode: e.target.barcode.value,
        email: e.target.email.value,
        admission_no: e.target.admission_number.value,
        fullname: e.target.fullname.value,
        class: e.target.class.value,
        grade: e.target.grade.value,
        whatsapp: e.target.whatsapp.value,
      };
      toast.loading("Adding a Member", {
        id: "adding_toast",
      });
      let response = await axios.post(`members/create`, dataSet);
      toast.success("Member Added.", {
        id: "adding_toast",
      });
      e.target.reset();
    } catch (error) {
      toast.error("Something went wrong", {
        id: "adding_toast",
      });
    }
  }
  return (
    <div className="main">
      <div className="flex items-center justify-between">
        <div className="page-title">Add Member</div>
      </div>{" "}
      <TopNav active="mem" />
      <div className="mt-6 text-lg font-semibold">Create Member</div>
      <hr className="my-4" />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Barcode" name="barcode" defaultValue="0000000" />
          <Input label="Email" name="email" />
          <Input label="Admission No" name="admission_number" />
          <Input label="Full Name" name="fullname" />
          <Input label="Grade" name="grade" />
          <Input label="Class" name="class" />
          <Input label="WhatsApp" name="whatsapp" />
        </div>
        <div className="w-max mt-4">
          <Button>Add Member</Button>
        </div>
      </form>
    </div>
  );
}

function MemberItem(props) {
  return (
    <div>
      <div>LOOOREEEE</div>
    </div>
  );
}
