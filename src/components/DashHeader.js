import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSendLogOutMutation } from "../features/Auth/authApiSlice";

//regular expressions
const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogOut, { isLoading, isError, error, isSuccess }] =
    useSendLogOutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  //handler
  const onLogOutClickedHandler = () => sendLogOut();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const sendLogOutButton = (
    <button
      className="icon-button"
      title="Logout"
      onClick={onLogOutClickedHandler}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
  const content = (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {sendLogOutButton}
          {/* add more buttons later */}
        </nav>
      </div>
    </header>
  );

  return content;
};

export default DashHeader;
