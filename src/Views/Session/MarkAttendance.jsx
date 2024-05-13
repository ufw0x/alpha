import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";
import Button from "../../Components/Button/Button";
import NotifySound from "../../Assets/notify.wav";
import TopNav from "../../Components/Extra/TopNav";
import { CourseTitle } from "./List";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function MarkAttendance() {
  document.title = `Morning Courses Dashboard - Mark Attendance`;
  const [result, setResult] = useState("0000-0000");
  const [memberData, setMemberData] = useState({
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
  const [markerOpen, setMarkerOpen] = useState(false);
  const { classType, id } = useParams();

  let isRequestPending = false;
  function throttleApiRequest(code) {
    return new Promise(async (res, rej) => {
      if (!isRequestPending) {
        isRequestPending = true;
        let response = await axios.get(`/members/find-by-barcode/${code}`);
        setTimeout(() => {
          isRequestPending = false;
          res(response);
        }, 500);
        try {
        } catch (error) {
          rej(error);
          isRequestPending = false;
        }
      }
    });
  }
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode-scanner"),
          constraints: {
            width: window.innerWidth,
            height: window.innerHeight,
            facingMode: "environment", // Use the back camera by default
          },
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader"], // Use the EAN reader
          multiple: false,
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      if (!markerOpen) {
        // Quagga.stop();
        setResult(data.codeResult.code);
        handleCodeRead(data.codeResult.code);
      }
    });

    return () => {
      Quagga.stop();
    };
  }, []);
  async function handleCodeRead(code) {
    if (!markerOpen) {
      setTimeout(async () => {
        try {
          toast.loading("Fetching Member", { id: "ftc-m" });
          let response = await throttleApiRequest(code);
          toast.success("Done", { id: "ftc-m" });
          if (response.data.member) {
            setMemberData(response.data.member);
            setMarkerOpen(true);
          } else {
            toast.error("Member doesn't exsist", { id: "ftc-m" });
            setMarkerOpen(false);
          }
        } catch (error) {
          toast.error("Something went wrong", { id: "ftc-m" });
        }
      }, 400);
    }
  }
  async function handleAttendance() {
    try {
      toast.loading("Marking", { id: "mark-mem" });
      let resp = await axios.post(`/attendance/session/${id}`, {
        member_id: memberData._id,
      });
      toast.success("Marked", { id: "mark-mem" });
      setMarkerOpen(false);
    } catch (error) {
      if (error.response.status === 409) {
        setMarkerOpen(false);
        toast.error("Already marked", { id: "mark-mem" });
      } else {
        toast.error("Something went wrong", { id: "mark-mem" });
      }
    }
  }
  return (
    <div className="main">
      <div className="flex items-center justify-between">
        {" "}
        <div className="page-title">{CourseTitle(classType)}</div>
      </div>
      <TopNav active="cls" />
      <div className="mt-6 text-lg font-semibold">
        Session: Introduction to Web Designing
      </div>
      <div className="bg-neutral-700 rounded p-2 my-6">
        <div className="text-center text-white mb-2">Scan Barcode</div>
        <div id="barcode-scanner" style={{ width: "100%" }}></div>
      </div>
      <div className={`marker ${markerOpen ? "active" : ""}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold bg-yellow-800 rounded-full px-4 py-1 text-white">
            {memberData.barcode}
          </div>
          <div
            onClick={() => {
              setMarkerOpen(false);
            }}
            className="bg-red-400 w-6 cursor-pointer h-6 flex items-center justify-center rounded-full text-lg text-white"
          >
            &times;
          </div>
        </div>
        <div className="my-2">
          <div className="text-xs font-semibold text-neutral-500">Name:</div>
          <div className="text-neutral-800">
            {memberData.fullname}{" "}
            <Link
              className="text-blue-500 underline"
              to={`/members/edit/${memberData._id}`}
            >
              (Edit)
            </Link>
          </div>
        </div>

        <div className="my-2">
          <div className="text-xs font-semibold text-neutral-500">Class:</div>
          <div className="text-neutral-800">
            {memberData.grade}-{memberData.class}
          </div>
        </div>

        <div className="my-2">
          <div className="text-xs font-semibold text-neutral-500">
            Admission No:
          </div>
          <div className="text-neutral-800">{memberData.admission_no}</div>
        </div>
        <div className="my-2">
          <div className="text-xs font-semibold text-neutral-500">
            Whatsapp:
          </div>
          <div className="text-neutral-800">{memberData.whatsapp}</div>
        </div>
        <div className="my-2">
          <div className="text-xs font-semibold text-neutral-500">Email:</div>
          <div className="text-neutral-800">{memberData.email}</div>
        </div>
        <Button onClick={handleAttendance}>Mark Attendance</Button>
      </div>
    </div>
  );
}
