import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import Logo from "~/components/Logo/Logo";
import SearchBar from "~/components/SearchBar/SearchBar";
import NavItems from "~/components/NavItems/NavItems";
import LogSign from "~/components/LogSign/LogSign";

const cx = classNames.bind(styles);

function Header({ className, style, ...props }) {
  return (
    <div
      className={cx("wrapper", {
        [className]: className,
      })}
      style={style}
    >
      <div className={cx("content")}>
        <Logo medium>T</Logo>
        <SearchBar className={cx("search-bar")} placeholder="Search Daily" />
        <NavItems className={cx("nav-items")} />
        <LogSign className={cx("log-sign")} />
      </div>
    </div>
  );
}

export default Header;
