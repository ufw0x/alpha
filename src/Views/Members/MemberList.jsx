import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import TopNav from "../../Components/Extra/TopNav";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function MemberList() {
  document.title = `Morning Courses Dashboard - Members`;
  const [FilteredMembers, setFilteredMembers] = useState([]);
  const [Members, setMembers] = useState([]);
  useEffect(() => {
    init();
  }, []);
  async function init() {
    try {
      let response = await axios.get("/members/all");
      let dataSet = response.data.data;
      setMembers(dataSet);
      setFilteredMembers(dataSet);
    } catch (error) {
      toast.error("Cannot fetch members");
    }
  }
  function handleFilter(evt) {
    let q = `${evt.target.value}`.toLocaleLowerCase();
    let unfiltered = Members || [];
    let filtered = unfiltered.filter((val) => {
      if (q) {
        if (val.fullname && val.barcode) {
          return (
            `${`${val.fullname}`.toLocaleLowerCase()}`.includes(q) ||
            val.barcode.includes(q)
          );
        }
        return false;
      }
      return true;
    });
    setFilteredMembers(filtered);
  }
  return (
    <div className="main">
      <div className="page-title">Members</div>
      <TopNav active="mem" />
      <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
        <div className="mt-6 text-lg font-semibold">All Members</div>
        <div className="flex flex-wrap items-center gap-2">
          <div>
            <input
              className="input"
              placeholder="Search"
              onKeyUp={handleFilter}
            />
          </div>
          <Link to={"/members/add"}>
            <Button>Create Member</Button>
          </Link>
        </div>
      </div>
      <hr className="my-4" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {FilteredMembers.map((mem, i) => {
          return <MemberItem {...mem} key={`member_${i}`} />;
        })}
      </div>
    </div>
  );
}

function MemberItem(props) {
  return (
    <Link
      to={`/members/edit/${props._id}`}
      className="px-4 py-2 bg-neutral-50 rounded"
    >
      <div className="text-xs mb-1 px-3 rounded-full font-semibold py-1 bg-yellow-800 text-white w-max">
        {props.barcode}
      </div>
      <div className="text-lg font-semibold">{props.fullname}</div>
      <div className="text-sm mt-1 font-medium">
        {props.grade}-{props.class} {props.email ? ` • ${props.email}` : null}{" "}
        {props.whatsapp ? ` • ${props.whatsapp}` : null}
      </div>
    </Link>
  );
}
