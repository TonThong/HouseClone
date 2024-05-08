import classNames from "classnames/bind";
import styles from "./Logo.module.scss";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Logo({ medium, large, className, children, disable, ...props }) {
  return disable ? (
    <div
      {...props}
      className={cx(`logo`, {
        medium,
        large,
        [className]: className,
      })}
    >
      {children}
    </div>
  ) : (
    <Link to="/">
      <div
        {...props}
        className={cx(`logo`, {
          medium,
          large,
          [className]: className,
        })}
      >
        {children}
      </div>
    </Link>
  );
}

export default Logo;
