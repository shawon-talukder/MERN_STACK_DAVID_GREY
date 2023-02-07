import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/UsersApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const users = useSelector(selectAllUsers);
  console.log(users);
  if(!users.length) return <p>Not Currently Available!</p>
  const content = users ? (
    <NewNoteForm users={users} />
  ) : (
    <p>Loading users...</p>
  );
  return content;
};

export default NewNote;
