import classNames from "classnames/bind";
import styles from "./Separator.module.scss";

const cx = classNames.bind(styles);

function Separator() {
  return <span className={cx("wrapper")}>|</span>;
}

export default Separator;
