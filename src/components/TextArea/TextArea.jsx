import classNames from "classnames/bind";
import styles from "./TextArea.module.scss";
import { useRef } from "react";

const cx = classNames.bind(styles);

function TextArea({
  className,
  type = "text",
  placeholder,
  required,
  id,
  label,
  ...props
}) {
  const inputElement = useRef();

  let requiredElement = null;
  if (required) {
    requiredElement = <div className={cx("required")}>{required}</div>;
  }

  function addWarning(e) {
    if (!e.target.value) {
      e.target.classList.add(cx("warning"));
    }
  }

  function removeWarning(e) {
    e.target.classList.remove(cx("warning"));
  }

  return (
    <div id={id} className={cx("wrapper")}>
      {label ? <label htmlFor={cx("input")}>{label}</label> : null}
      <textarea
        ref={inputElement}
        className={className}
        type={type}
        placeholder={placeholder}
        id={cx("input")}
        onBlur={required ? addWarning : null}
        onFocus={required ? removeWarning : null}
      ></textarea>
      {requiredElement}
    </div>
  );
}

export default TextArea;
