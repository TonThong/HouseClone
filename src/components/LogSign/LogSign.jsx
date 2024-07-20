import Button from "~/components/Button/Button";

import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./LogSign.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function LogSign({ className, ...props }) {
  let user = localStorage.getItem("isUser") == "true";
  let gmail = localStorage.getItem("gmail");

  return (
    <>
      {user ? (
        <div className={cx("list-user wrapper", className)}>
          <img
            className={cx("user")}
            src="https://house-clone-api.vercel.app/src/images/user.jpg"
          ></img>
          <ul className={cx("user-selection")}>
            <li>
              <Link
                to={`/profile/${localStorage.getItem(`name-${gmail}`)}`}
                className={cx("profile")}
              >
                Profile
              </Link>
            </li>
            <li
              onClick={() => {
                alert("Updating setting...");
              }}
            >
              Setting
            </li>
            <li>
              <Link
                to="/log"
                className={cx("log-out")}
                onClick={() => {
                  localStorage.setItem("isUser", false);
                }}
              >
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className={cx("wrapper", className)}>
          <Link to="/log">
            <Button className={cx("log")} text>
              Log in
            </Button>
          </Link>
          <Link to="/sign">
            <Button className={cx("sign")}>Sign up</Button>
          </Link>
        </div>
      )}
      <div className={cx("wrapper-mobile", className)}>X</div>
    </>
  );
}

export default LogSign;
