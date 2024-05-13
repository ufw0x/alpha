import React, { useEffect, useState } from "react";
import Button, { ErrorButton } from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import TopNav from "../../Components/Extra/TopNav";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../Components/Extra/Modal";

export default function Edit() {
  document.title = `Morning Courses Dashboard - Edit Member`;
  const { id } = useParams();
  const nav = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [Member, setMember] = useState({
    member_id: "",
    email: "",
    fullname: "",
    barcode: "",
    class: "",
    grade: "",
    whatsapp: "",
    admission_no: "",
    added_by: "",
  });
  const styles = {
    navItem: `bg-neutral-100 px-8 py-2 font-medium rounded transition-all`,
  };
  useEffect(() => {
    fetchMember();
  }, []);
  async function fetchMember() {
    try {
      let response = await axios.get(`/members/find/${id}`);
      if (response.data.data) {
        setMember(response.data.data);
      } else {
        toast.error("Member not found", { id: "member-fetch" });
        nav("/members");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let dataSet = {
        barcode: e.target.barcode.value,
        email: e.target.email.value,
        admission_no: e.target.admission_no.value,
        fullname: e.target.fullname.value,
        class: e.target.class.value,
        grade: e.target.grade.value,
        whatsapp: e.target.whatsapp.value,
      };
      toast.loading("Updating Member", {
        id: "update_toast",
      });
      let response = await axios.patch(`members/update/${id}`, dataSet);
      toast.success("Member Updated.", {
        id: "update_toast",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        id: "update_toast",
      });
    }
  }
  async function deleteMember() {
    try {
      toast.loading("Deleting Member", {
        id: "del_toast",
      });
      let response = await axios.delete(`members/delete/${id}`);
      toast.success("Member Deleted.", {
        id: "del_toast",
      });
      nav("/members");
    } catch (error) {
      toast.error("Something went wrong", {
        id: "del_toast",
      });
    }
  }
  return (
    <div className="main">
      <div className="flex items-center justify-between">
        <div className="page-title">Edit Member</div>
      </div>{" "}
      <TopNav active="mem" />
      <div className="mt-6 text-lg font-semibold">Member Details</div>
      <hr className="my-4" />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Barcode" name="barcode" defaultValue={Member.barcode} />
          <Input label="Email" name="email" defaultValue={Member.email} />
          <Input
            label="Admission No"
            name="admission_no"
            defaultValue={Member.admission_no}
          />
          <Input
            label="Full Name"
            name="fullname"
            defaultValue={Member.fullname}
          />
          <Input label="Grade" name="grade" defaultValue={Member.grade} />
          <Input label="Class" name="class" defaultValue={Member.class} />
          <Input
            label="WhatsApp"
            name="whatsapp"
            defaultValue={Member.whatsapp}
          />
        </div>
        <div className="w-max mt-4 flex gap-4 flex-wrap">
          <Button>Update Member</Button>
          <ErrorButton
            type="button"
            onClick={() => {
              setDeleteModalOpen(true);
            }}
          >
            Delete Member
          </ErrorButton>
        </div>
      </form>
      <Modal
        active={deleteModalOpen}
        close={() => {
          setDeleteModalOpen(false);
        }}
        title="Delete Member"
      >
        <div>Are you sure you want to delete this member?</div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-2 mt-4">
          <Button
            onClick={() => {
              setDeleteModalOpen(false);
            }}
          >
            Close
          </Button>
          <ErrorButton
            onClick={() => {
              deleteMember();
            }}
          >
            Delete
          </ErrorButton>
        </div>
      </Modal>
    </div>
  );
}
