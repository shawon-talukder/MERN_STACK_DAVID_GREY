import React from "react";
import { PulseLoader } from 'react-spinners';
import { useGetUsersQuery } from "../users/UsersApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const Users = useGetUsersQuery('userList', {
    selectFromResult: ({data})=>({
      users: data?.ids.map( id => data?.entries[id]),
    })
  })
  const {users}= Users;
  if(!users.length) return <PulseLoader color="#fff"/>;
  
  const content = <NewNoteForm users={users} />
  return content;
};

export default NewNote;
