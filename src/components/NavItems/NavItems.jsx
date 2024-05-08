import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./NavItems.module.scss";

const cx = classNames.bind(styles);

function NavItems({ className, itemClass, ...props }) {
  return (
    <div className={className}>
      <Link className={cx("nav-item", itemClass)} to="/search/projects">
        Projects
      </Link>
      <Link className={cx("nav-item", itemClass)} to="/search/images">
        Images
      </Link>
      <Link className={cx("nav-item", itemClass)} to="/search/products">
        Products&BIM
      </Link>
      <Link className={cx("nav-item", itemClass)} to="/search/professionals">
        Professional
      </Link>
      <Link className={cx("nav-item", itemClass)} to="/news">
        News
      </Link>
    </div>
  );
}

export default NavItems;
