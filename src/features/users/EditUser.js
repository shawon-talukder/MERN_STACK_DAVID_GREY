import React from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./UsersApiSlice";
const EditUser = () => {
  const { id } = useParams();
  const user = useGetUsersQuery("userList", {
    selectFromResult: ({data})=>({
      user: data?.entities[id]
    })
  })

  const content = user ? <EditUserForm user={user} /> : <PulseLoader color="#fff"/>;
  return content;
};

export default EditUser;
