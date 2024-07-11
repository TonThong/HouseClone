import classNames from "classnames/bind";
import styles from "./Button.module.scss";

import { forwardRef } from "react";

const cx = classNames.bind(styles);

const Button = forwardRef(function Button(
  { className, text, children, type, ...props },
  ref
) {
  return (
    <div className={className} ref={ref}>
      <button
        className={cx("button", {
          text,
        })}
        type={type}
        {...props}
      >
        {children}
      </button>
    </div>
  );
});

export default Button;
