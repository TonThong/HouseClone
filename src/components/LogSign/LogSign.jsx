import Button from "~/components/Button/Button";

import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./LogSign.module.scss";

const cx = classNames.bind(styles);

function LogSign({ className, ...props }) {
  return (
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
  );
}

export default LogSign;
