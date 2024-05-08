import Header from "~/pages/components/Header/Header";
import Footer from "~/pages/components/Footer/Footer";
import Input from "~/components/Input/Input";
import Button from "~/components/Button/Button";
import TextArea from "~/components/TextArea/TextArea";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import classNames from "classnames/bind";
import styles from "./AdvertisePage.module.scss";

const cx = classNames.bind(styles);

function Advertise() {
  const [services, setServices] = useState([]);
  const [count, setCount] = useState(0);
  const [branch, setBranch] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/advertise")
      .then((res) => res.json())
      .then((items) => {
        setServices(items[0]);
        setBranch(items[1]);
        setCount(1);
      });
  }, [count]);

  let listService = services.services;
  let listBranch = branch.branches;

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("content")}>
        <div className={cx("background")}>
          <div className={cx("background-primary")}></div>
          <div className={cx("background-white")}></div>
        </div>
        <div className={cx("content-main", "grid wide")}>
          <div className={cx("introduce")}>
            <h3 className={cx("introduce-title")}>T Marketing Solutions</h3>
            <h4 className={cx("introduce-title-extra")}>
              Become part of the world's largest architecture network
            </h4>
            <p className={cx("introduce-text")}>
              By joining T you'll position your brand in the most strategic
              possible place and will get referenced by architects along the
              way. Start showcasing your products now!
            </p>
            <ul className={cx("introduce-items")}>
              {listService
                ? listService.map((service, index) => {
                    return (
                      <li key={index} className={cx("introduce-item")}>
                        <p>{service}</p>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </li>
                    );
                  })
                : null}
            </ul>
            <div className={cx("copyright")}>© Ton That Thong</div>
          </div>

          <div className={cx("form")}>
            <form className={cx("form-content")}>
              <h3 className={cx("form-title")}>Get in touch</h3>
              <Input
                required="The Name field is required"
                className={cx("form-input")}
                placeholder="Your Name"
              />
              <Input
                required="The Email field is required and must be valid"
                className={cx("form-input")}
                placeholder="example@gmail.com"
                type="email"
              />
              <Input
                className={cx("form-input")}
                selection
                data={listBranch ? listBranch : []}
              />
              <Input
                required="The Company field is required"
                className={cx("form-input")}
                placeholder="Your Company"
              />
              <Input
                className={cx("form-input")}
                placeholder="Country / Region"
              />
              <Input
                className={cx("form-input")}
                placeholder="Company's Website"
              />
              <TextArea
                required="The Message field is required"
                className={cx("form-input-message")}
                placeholder="Message"
              />
              <div className={cx("agree")}>
                <Input id={cx("agree")} type="checkbox" />
                <label htmlFor={cx("agree")}>
                  I agree to the Terms of use and the Privacy Policy
                </label>
              </div>
              <Button className={cx("submit")}>GET OUR MEDIA KIT</Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Advertise;
