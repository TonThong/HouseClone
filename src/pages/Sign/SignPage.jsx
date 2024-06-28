import Logo from "~/components/Logo/Logo";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";

import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SignPage.module.scss";

const cx = classNames.bind(styles);

function SignPage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("background")}>
        <img src="https://house-clone-api.vercel.app/src/images/logSign/backGround_1.jpg"></img>
        <div className={cx("background-primary")}></div>
      </div>
      <div className={cx("content")}>
        <form className={cx("content-form")}>
          <Logo disable className={cx("logo")} large>
            T
          </Logo>
          <h3 className={cx("introduce")}>Welcome to T!</h3>
          <Input
            required="Name field required"
            className={cx("form-input")}
            id={cx("name")}
            label="Name"
            type="text"
            placeholder="Your name"
          />
          <Input
            required="Email field is invalid"
            className={cx("form-input")}
            id={cx("email")}
            label="Email"
            type="email"
            placeholder="example@gmail.com"
          />
          <div className={cx("password")}>
            <Input
              required="Password field is invalid"
              className={cx("form-input")}
              id={cx("password")}
              label="Password"
              type="password"
              placeholder="Password have 8 or more characters"
            />
          </div>
          <Link
            onMouseDown={() => {
              let filter =
                /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
              if (
                !filter.test(document.querySelector(`#${cx("email")}`).value)
              ) {
                alert("Invalid email, please try again.");
                email.focus;
              }
            }}
            to="/log"
          >
            <Button
              className={cx("submit")}
              onClick={() => {
                localStorage.setItem(
                  `${document.querySelector(`#${cx("email")}`).value}`,
                  `${document.querySelector(`#${cx("password")}`).value}`
                );
                alert("Success!");
              }}
            >
              Sign Up
            </Button>
          </Link>
          <p>
            Already have an account?
            <Link className={cx("sign")} to="/log">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignPage;
