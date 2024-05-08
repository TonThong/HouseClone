import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({ className, text, children, type, ...props }) {
  return (
    <div className={className}>
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
}

export default Button;
