import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/Auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isManager = false;
  let isAdmin = false;
  let status = "Employee";
  if (token) {
    const decodedToken = jwtDecode(token);

    const { username, roles } = decodedToken.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, status, isAdmin, isManager, roles };
  }

  return { username: "", roles: [], isManager, isAdmin, status };
};

export default useAuth;
