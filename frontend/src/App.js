import { Route, Routes } from "react-router-dom";
import DashLayout from "./components/DashLayout";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/Auth/Login";
import Welcome from "./features/Auth/Welcome";
import NoteList from "./features/notes/NoteList";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />

        {/* dashlayout starts */}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="notes">
            <Route index element={<NoteList />} />
          </Route>
          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
        </Route>
        {/* dash ends */}
      </Route>
    </Routes>
  );
}

export default App;
