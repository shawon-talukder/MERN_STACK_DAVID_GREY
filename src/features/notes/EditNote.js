import React from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from 'react-spinners';
import useAuth from "../../hooks/useAuth";
import { useGetUsersQuery } from "../users/UsersApiSlice.js";
import EditNoteForm from "./EditNoteForm.js";
import { useGetNotesQuery } from "./notesApiSlice";

const EditNote = () => {
  const { id } = useParams();
  const {username, isManager, isAdmin}= useAuth();
  const Note = useGetNotesQuery('noteList',{
    selectFromResult:({data})=>({
      note: data?.entities[id],
    })
  })
  
  const Users = useGetUsersQuery('userList',{
    selectFromResult: ({data})=>({
      users: data?.ids?.map(id => data?.entities[id]),
    })
  });
  const {note} = Note;
  const {users} = Users;

  if(!note || !users?.length) return <PulseLoader color="#fff"/>

  if(!isManager ||!isAdmin){
    if(note.username !== username) return <p className="errmsg">No Access!!!!</p>
  }

  const content = <EditNoteForm note={note} users={users} />
    
  return content;
};

export default EditNote;
