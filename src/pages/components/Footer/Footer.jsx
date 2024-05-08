import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "~/components/Logo/Logo";

const cx = classNames.bind(styles);

function Footer({ className, ...props }) {
  return (
    <div className={cx("wrapper", className)}>
      <div className={cx("content", "grid wide")}>
        <div className={cx("links")}>
          <ul className={cx("insides", "col l-6")}>
            <li className={cx("inside")}>Work at T</li>
            <li className={cx("inside")}>Terms of Use</li>
            <li className={cx("inside")}>Privacy Policy</li>
            <li className={cx("inside")}>Cookie Policy</li>
            <li className={cx("inside")}>RSS</li>
          </ul>
          <ul className={cx("socials", "col l-2")}>
            <li className={cx("social")}>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li className={cx("social")}>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li className={cx("social")}>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className={cx("social")}>
              <a href="#">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </li>
            <li className={cx("social")}>
              <a href="#">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
          </ul>
        </div>
        <div className={cx("copyright")}>
          <Logo className={cx("copyright-logo")} large>
            T
          </Logo>
          <div className={cx("copyright-text")}>
            <p>© All rights reserved. T 2024</p>
            <p>VIETNAM +84 774565578</p>
            <p>All images are © each office/photographer mentioned.</p>
            <p>Author Ton That Thong</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
