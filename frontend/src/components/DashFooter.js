import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => {
    navigate("/dash");
  };
  let GoHomeButton = null;

  if (pathname !== "/dash") {
    GoHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  const content = (
    <footer className="dash-footer">
      {GoHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
  return content;
};

export default DashFooter;
