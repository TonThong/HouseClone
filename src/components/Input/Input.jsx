import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { useRef } from "react";

const cx = classNames.bind(styles);

function Input({
  className,
  childClass,
  selection,
  data,
  type = "text",
  placeholder,
  label,
  id,
  required,
  children,
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

  return selection ? (
    <div id={id} className={cx("wrapper")}>
      {label ? <label htmlFor={cx("input")}>{label}</label> : null}
      <select className={cx("select", className)} id={cx("input")}>
        {data.map((data, index) => {
          return (
            <option key={index} value={data}>
              {data}
            </option>
          );
        })}
      </select>
    </div>
  ) : (
    <div className={cx("wrapper")}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        ref={inputElement}
        className={className}
        type={type}
        placeholder={placeholder}
        id={id}
        onBlur={required ? addWarning : null}
        onFocus={required ? removeWarning : null}
      ></input>
      {requiredElement}
    </div>
  );
}

export default Input;
