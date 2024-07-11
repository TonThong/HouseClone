import Logo from "~/components/Logo/Logo";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";

import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./LogPage.module.scss";

const cx = classNames.bind(styles);

function LogPage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("background")}>
        <img src="https://house-clone-api.vercel.app/src/images/logSign/backGround_1.jpg"></img>
        <div className={cx("background-primary")}></div>
      </div>
      <div className={cx("content")}>
        <form
          className={cx("content-form")}
          onSubmit={(event) => {
            event.preventDefault();
          }}
          action=""
        >
          <Logo disable className={cx("logo")} large>
            T
          </Logo>
          <h3 className={cx("introduce")}>Welcome Back To T!</h3>
          <Input
            className={cx("form-input")}
            id={cx("email")}
            label="Email"
            type="email"
            placeholder="example@gmail.com"
          />
          <div className={cx("password")}>
            <Input
              className={cx("form-input")}
              id={cx("password")}
              label="Password"
              type="password"
              placeholder="Password have 8 or more characters"
            />
            <a href="#">Forgot your password?</a>
          </div>

          <Link
            onClick={() => {
              if (
                !localStorage.getItem(
                  document.querySelector(`#${cx("email")}`).value
                ) ||
                localStorage.getItem(
                  document.querySelector(`#${cx("email")}`).value
                ) != document.querySelector(`#${cx("password")}`).value
              ) {
                alert(`Invalid email or password`);
                Event.preventDefault();
              } else {
                localStorage.setItem(
                  "gmail",
                  document.querySelector(`#${cx("email")}`).value
                );
                localStorage.setItem("isUser", true);
              }
            }}
            to={`/`}
          >
            <input type="submit" id={cx("submit")}></input>
            <Button className={cx("submit")}>Log In</Button>
          </Link>
          <p>
            Not registered yet?
            <Link className={cx("sign")} to="/sign">
              Join
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogPage;
