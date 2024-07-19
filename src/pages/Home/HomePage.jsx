import { useEffect, useState, useRef } from "react";
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
import PopUpAddFolder from "~/components/PopupAddFolder/PopupAddFolder";

import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

function HomePage() {
  const [gmail] = useState(localStorage.getItem("gmail") || "");

  const [data, setData] = useState({
    projects: [],
    show: null,
    productsCatalog: [],
    products: [],
  });
  const [headerShow, setHeaderShow] = useState("-100");

  useEffect(() => {
    fetch("https://house-clone-api.vercel.app/home")
      .then((res) => res.json())
      .then((items) => {
        setData({
          projects: items,
          show: items[0],
          productsCatalog: items[4]?.productsCatalog || [],
          products: items[5]?.projects || [],
        });
      });
  }, []);

  const projectList = data.projects.filter(
    (project) => project.type === "Featured"
  );
  const choiceProject = data.projects.find(
    (project) => project.type === "Editor's Choice"
  );

  const handleImage = (e) => {
    setData((prevData) => ({
      ...prevData,
      show: projectList[e.target.id - 1],
    }));
  };

  const overlayRef = useRef(null);
  const wrapperRef = useRef(null);
  const listFolderRef = useRef(null);
  const addRef = useRef(null);

  window.onscroll = () => {
    if (window.scrollY > 350) {
      setHeaderShow("0");
    } else {
      setHeaderShow("-100");
    }
  };

  localStorage.setItem("project-save", null);

  const updateFolderData = (newListTitleFolder, newListFolder) => {};

  return (
    <>
      <PopUpAddFolder
        className={cx("popup-add-folder")}
        references={{ overlayRef, wrapperRef, listFolderRef, addRef }}
        updateFolderData={updateFolderData}
      />
      {headerShow && (
        <Header
          className={cx("Header")}
          style={{ transform: `translateY(${headerShow}%)` }}
        />
      )}
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
                <a
                  href="https://www.architonic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Architonic
                </a>
              </li>
            </ul>
            <Logo className={cx("logo")} large>
              T
            </Logo>
            <div className={cx("log-sign")}>
              <LogSign className={cx("log-sign-main")} />
            </div>
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
            {data.show && (
              <div className={cx("project-show-content")}>
                <img
                  key={data.show.id + 100}
                  src={data.show.src}
                  alt={data.show.name}
                />
                <div className={cx("project-description")}>
                  <h3>{data.show.type}</h3>
                  <p>{data.show.name}</p>
                </div>
              </div>
            )}
          </div>
          <div className={cx("project-lists", "col l-2")}>
            {projectList.map((project) => (
              <img
                className={cx("project-lists-item")}
                key={project.id}
                id={project.id}
                src={project.src}
                alt={project.name}
                onMouseOver={handleImage}
              />
            ))}
          </div>
          <div className={cx("project-lists", "col l-4")}>
            {choiceProject && (
              <div className={cx("project-edit")}>
                <img
                  key={choiceProject.id}
                  src={choiceProject.src}
                  alt={choiceProject.name}
                />
                <div className={cx("project-description")}>
                  <h3>{choiceProject.type}</h3>
                  <p>{choiceProject.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={cx("content", "row")}>
          <div className={cx("content-main", "col l-8")}>
            {data.products.map((product, index) => (
              <div key={index} className={cx("content-project")}>
                <h3 className={cx("content-project-title")}>{product.title}</h3>
                <p className={cx("content-project-time")}>{product.time}</p>
                <div className={cx("content-project-preview")}>
                  <img src={product.mainPicture} alt={product.title} />
                </div>
                <div className={cx("content-project-description")}>
                  <p>{product.description}</p>
                </div>
                <ul className={cx("content-project-pictures")}>
                  {product.pictures.slice(0, 5).map((picture, index) => (
                    <li key={index} className={cx("content-project-picture")}>
                      <img src={picture} alt={`Project image ${index + 1}`} />
                      {index === 4 && product.pictures.length > 5 && (
                        <>
                          <div className={cx("content-project-number")}>
                            +{product.pictures.length - 5}
                          </div>
                          <div className={cx("content-project-overlay")}></div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <div className={cx("save-read")}>
                  <Button
                    className={cx("save-btn")}
                    onClick={() => {
                      overlayRef.current.style.visibility = "visible";
                      wrapperRef.current.style.visibility = "visible";
                      localStorage.setItem("project-save", `${product.id}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faFolderOpen} />
                    Save this Project
                  </Button>
                  <Link to={`${product.id}`}>
                    <Button text className={cx("read-btn")}>
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className={cx("content-extra", "col l-4")}>
            <div className={cx("content-extra-total")}>
              <div className={cx("products-catalog", "grid wide")}>
                <h3 className={cx("products-catalog-title")}>
                  Products Catalog
                </h3>
                <ul className={cx("products-catalog-items", "row")}>
                  {data.productsCatalog.map((productCatalog, index) => (
                    <li
                      key={index}
                      className={cx("products-catalog-item", "col l-6")}
                    >
                      <a href="#">
                        <img
                          src={productCatalog.src}
                          alt={`Product ${index + 1}`}
                        />
                      </a>
                    </li>
                  ))}
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
