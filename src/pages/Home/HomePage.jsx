import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";

import Logo from "~/components/Logo/Logo";
import LogSign from "~/components/LogSign/LogSign";
import NavItems from "~/components/NavItems/NavItems";
import SearchBar from "~/components/SearchBar/SearchBar";
import Header from "~/pages/components/Header/Header";
import Footer from "~/pages/components/Footer/Footer";

import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsCatalog, setProductsCatalog] = useState([]);
  const [headerShow, setHeaderShow] = useState("-100");

  const [count, setCount] = useState(0);
  const [show, setShow] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/home")
      .then((res) => res.json())
      .then((items) => {
        setProjects(items);
        setShow(items[0]);
        setProductsCatalog(items[4].productsCatalog);
        setProducts(items[5].projects);
        setCount(1);
      });
  }, [count]);

  let projectList = projects.filter((project) => project.type == "Featured");

  let choiceProject = projects.filter(
    (project) => project.type == "Editor's Choice"
  );
  choiceProject = choiceProject[0];

  function handleImage(e) {
    setShow(projectList[e.target.id - 1]);
  }

  window.onscroll = () => {
    if (window.scrollY > 350) {
      setHeaderShow("0");
    }
    if (window.scrollY < 350) {
      setHeaderShow("-100");
    }
  };

  return (
    <>
      {headerShow ? (
        <Header
          className={cx("Header")}
          style={{ transform: `translateY(` + headerShow + `%)` }}
        />
      ) : null}
      <div className={cx("wrapper", "grid wide")}>
        <div className={cx("start")}>
          <div className={cx("introduce")}>
            <ul className={cx("options")}>
              <li className={cx("option")}>
                <Link to="/contact">Submit a Project</Link>
              </li>
              <li className={cx("option")}>
                <Link to="/advertise">Advertise</Link>
              </li>
              <li className={cx("option")}>
                <a href="https://www.architonic.com/" target="_blank">
                  Architonic
                </a>
              </li>
            </ul>
            {/* <div className={cx("language")}></div> */}
            <Logo className={cx("logo")} large>
              T
            </Logo>
            <div className={cx("log-sign")}>
              <LogSign className={cx("log-sign-main")} />
            </div>
            {/* <div className={cx("menu")}></div> */}
          </div>
          <div className={cx("nav")}>
            <div className={cx("nav-content")}>
              <NavItems
                className={cx("nav-items")}
                itemClass={cx("nav-item")}
              />
              <SearchBar
                placeholder="Search Daily"
                className={cx("search-bar")}
              />
            </div>
          </div>
        </div>
        <div className={cx("project", "row")}>
          <div className={cx("project-show", "col l-6")}>
            {show ? (
              <div className={cx("project-show-content")}>
                <img key={show.id + 100} src={show.src}></img>
                <div className={cx("project-description")}>
                  <h3>{show.type}</h3>
                  <p>{show.name}</p>
                </div>
              </div>
            ) : null}
          </div>
          <div className={cx("project-lists", "col l-2")}>
            {projectList.map((project) => {
              return (
                <img
                  className={cx("project-lists-item")}
                  key={project.id}
                  id={project.id}
                  src={project.src}
                  onMouseOver={handleImage}
                ></img>
              );
            })}
          </div>
          <div className={cx("project-lists", "col l-4")}>
            {choiceProject ? (
              <div className={cx("project-edit")}>
                <img key={choiceProject.id} src={choiceProject.src}></img>
                <div className={cx("project-description")}>
                  <h3>{choiceProject.type}</h3>
                  <p>{choiceProject.name}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={cx("content", "row")}>
          <div className={cx("content-main", "col l-8")}>
            {products
              ? products.map((product, index) => {
                  return (
                    <div key={index} className={cx("content-project")}>
                      <h3 className={cx("content-project-title")}>
                        {product.title}
                      </h3>
                      <p className={cx("content-project-time")}>
                        {product.time}
                      </p>
                      <div className={cx("content-project-preview")}>
                        <img src={product.mainPicture}></img>
                      </div>
                      <div className={cx("content-project-description")}>
                        <p>{product.description}</p>
                      </div>
                      <ul className={cx("content-project-pictures")}>
                        {product.pictures.map((picture, index) => {
                          if (index < 4) {
                            return (
                              <li
                                key={index}
                                className={cx("content-project-picture")}
                              >
                                <img src={picture}></img>
                              </li>
                            );
                          }
                          if (index == 4) {
                            return (
                              <li
                                key={index}
                                className={cx("content-project-picture")}
                              >
                                <img src={picture}></img>
                                <div className={cx("content-project-number")}>
                                  +{product.pictures.length - 4}
                                </div>
                                <div
                                  className={cx("content-project-overlay")}
                                ></div>
                              </li>
                            );
                          }
                        })}
                      </ul>
                      <div className={cx("save-read")}>
                        <Button className={cx("save-btn")}>
                          <FontAwesomeIcon icon={faFolderOpen} />
                          Save this Project
                        </Button>
                        <Link to="123456">
                          <Button text className={cx("read-btn")}>
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className={cx("content-extra", "col l-4")}>
            <div className={cx("content-extra-total")}>
              <div className={cx("products-catalog", "grid wide")}>
                <h3 className={cx("products-catalog-title")}>
                  Products Catalog
                </h3>
                <ul className={cx("products-catalog-items", "row")}>
                  {productsCatalog
                    ? productsCatalog.map((productCatalog, index) => {
                        return (
                          <li
                            key={index}
                            className={cx("products-catalog-item", "col l-6")}
                          >
                            <img src={productCatalog.src}></img>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
