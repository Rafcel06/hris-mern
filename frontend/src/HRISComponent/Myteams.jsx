import React from "react";
import {
  faUserGroup,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile from "../Assets/profile.jpg";

const Myteams = () => {
  return (
    <>
      <header
        className="dashboard-blocks-headers"
        style={{ background: "#fff" }}
      >
        <FontAwesomeIcon icon={faUserGroup} className="dashboard-icons" />
        My Teams
      </header>
      <figure id="dashboard-my-team-list">
        <div className="dashboard-profile-cards">
          <img className="dashboard-profile-picture" src={profile}></img>
          <p className="dashboard-profile-name">Rafcel Teberio</p>
          <p className="dashboard-profile-status">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="dashboard-profile-status-icons"
            />
            Alert
          </p>
        </div>

        <div className="dashboard-profile-cards">
          <img className="dashboard-profile-picture" src={profile}></img>
          <p className="dashboard-profile-name">Rafcel Teberio</p>
          <p className="dashboard-profile-status">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="dashboard-profile-status-icons"
            />
            Alert
          </p>
        </div>


        <div className="dashboard-profile-cards">
          <img className="dashboard-profile-picture" src={profile}></img>
          <p className="dashboard-profile-name">Rafcel Teberio</p>
          <p className="dashboard-profile-status">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="dashboard-profile-status-icons"
            />
            Alert
          </p>
        </div>


        <div className="dashboard-profile-cards">
          <img className="dashboard-profile-picture" src={profile}></img>
          <p className="dashboard-profile-name">Rafcel Teberio</p>
          <p className="dashboard-profile-status">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="dashboard-profile-status-icons"
            />
            Alert
          </p>
        </div>


        <div className="dashboard-profile-cards">
          <img className="dashboard-profile-picture" src={profile}></img>
          <p className="dashboard-profile-name">Rafcel Teberio</p>
          <p className="dashboard-profile-status">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="dashboard-profile-status-icons"
            />
            Alert
          </p>
        </div>
      </figure>
    </>
  );
};

export default Myteams;
