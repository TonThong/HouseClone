import classNames from "classnames/bind";
import styles from "./ContactPage.module.scss";

import { useState, useEffect } from "react";

import Header from "~/pages/components/Header/Header";
import Footer from "~/pages/components/Footer/Footer";
import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);

function Contact() {
  const [para, setPara] = useState();
  const [number, setNumber] = useState();
  const [type, setType] = useState();
  const [webValue, setWebValue] = useState("http://");

  const [count, setCount] = useState();

  useEffect(() => {
    fetch("https://house-clone-api.vercel.app/contact")
      .then((res) => res.json())
      .then((data) => {
        setCount(1);
        setPara(data[0]);
        setNumber(data[1]);
        setType(data[2]);
      });
  }, [count]);

  let paragraphs = para ? para.paragraph : null;
  let numbers = number ? number.items : null;
  let selectTypes = type ? type.selection : null;

  function handleValue(e) {
    console.log(e.target.value);
    setWebValue(e.target.value);
  }

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("content", "grid wide")}>
        <h3 className={cx("content-title")}>Contact / Submit</h3>
        <div className={cx("content-main")}>
          <div className={cx("content-text")}>
            {paragraphs
              ? paragraphs.map((paragraph, index) => {
                  return <p key={index}>{paragraph}</p>;
                })
              : null}
            <h3 className={cx("number-title")}>Our Numbers</h3>
            <ul className={cx("number-items")}>
              {numbers
                ? numbers.map((number, index) => {
                    return (
                      <li key={index} className={cx("number-item")}>
                        {number}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <div className={cx("content-form")}>
            <form className={cx("content-form-main")}>
              <div className={cx("type")}>
                <label htmlFor={cx("type")}>Do you want to</label>
                <select id={cx("type")}>
                  {selectTypes
                    ? selectTypes.map((selectType, index) => (
                        <option key={index} value={selectType}>
                          {selectType}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className={cx("name")}>
                <label htmlFor={cx("name")}>*Your name</label>
                <input id={cx("name")} type="text" placeholder="Name" />
              </div>
              <div className={cx("email")}>
                <label htmlFor={cx("email")}>*Your email</label>
                <input id={cx("email")} type="email" placeholder="Email" />
              </div>
              <div className={cx("firm")}>
                <label htmlFor={cx("firm")}>Firm</label>
                <input id={cx("firm")} type="text" placeholder="Office" />
              </div>
              <div className={cx("website")}>
                <label htmlFor={cx("website")}>Website</label>
                <input
                  id={cx("website")}
                  type="text"
                  value={webValue}
                  onChange={handleValue}
                />
              </div>
              <div className={cx("message")}>
                <label htmlFor={cx("message")}>Message</label>
                <textarea
                  placeholder="Message"
                  id={cx("message")}
                  type="text"
                />
              </div>
              <div className={cx("agree")}>
                <input id={cx("agree")} type="checkbox" />
                <label htmlFor={cx("agree")}>
                  I agree to the Terms of use and the Privacy Policy
                </label>
              </div>
              <Button className={cx("submit")}>SUBMIT</Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
