import classNames from "classnames/bind";
import styles from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function SearchBar({ type = "text", className, placeholder, ...props }) {
  return (
    <div className={className}>
      <div className={cx("search-bar")}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          className={cx("search-bar-input")}
          type={type}
          placeholder={placeholder}
        ></input>
      </div>
    </div>
  );
}

export default SearchBar;
