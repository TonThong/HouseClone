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
  let pathApi = "http://localhost:3000";

  const [gmail] = useState(localStorage.getItem("gmail") || "");

  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [projectShow, setProjectShow] = useState(null);
  const [headerShow, setHeaderShow] = useState("-100");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let projects = await fetch(`${pathApi}/projects`).then((res) =>
          res.json()
        );
        let products = await fetch(`${pathApi}/products`).then((res) =>
          res.json()
        );

        // const uniqueProjectIds = [...new Set(home.projectIds)];
        // const uniqueProductIds = [...new Set(home.productIds)];
        // const responseProjects = await Promise.all(
        //   uniqueProjectIds.map((id) => fetch(`${pathApi}/projects/${id}`))
        // );

        // const responseProducts = await Promise.all(
        //   uniqueProjectIds.map((id) => fetch(`${pathApi}/projects/${id}`))
        // );

        // const dataArr = await Promise.all(responses.map((res) => res.json()));
        // const dataArrProduct = await Promise.all(responses.map((res) => res.json()));
        setData(projects);
        setProducts(products);
        setProjectShow(projects[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchImages();
  }, [gmail]);

  // const projectList = data.projects.filter(
  //   (project) => project.type === "Featured"
  // );
  // const choiceProject = data.projects.find(
  //   (project) => project.type === "Editor's Choice"
  // );

  const handleImage = (e) => {
    data.forEach((project) => {
      if (project.id == e.target.id) {
        setProjectShow(project);
      }
    });
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
  console.log(products);
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
        <div className={cx("project")}>
          <div className={cx("project-show")}>
            {data ? (
              <div key={data[0].id} className={cx("project-show-content")}>
                <img
                  key={projectShow.id + 100}
                  src={projectShow.images[0]}
                  alt={projectShow.title}
                />
                <div className={cx("project-description")}>
                  <h3>{projectShow.type}</h3>
                  <p>{projectShow.title}</p>
                </div>
              </div>
            ) : null}
          </div>

          {data
            ? data.map((project, index) => {
                if (index < 3) {
                  return (
                    <div key={project.id} className={cx("project-lists-item")}>
                      <img
                        key={project.id}
                        id={project.id}
                        src={project.images[0]}
                        alt={project.title}
                        onMouseOver={handleImage}
                      />
                    </div>
                  );
                }
              })
            : null}

          {data ? (
            <div className={cx("project-edit")}>
              <img
                key={data[3].id}
                src={data[3].images[0]}
                alt={data[3].title}
              />
              <div className={cx("project-description")}>
                <h3>{data[3].type}</h3>
                <p>{data[3].title}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className={cx("content", "row")}>
          <div className={cx("content-main", "col l-8")}>
            {data
              ? data.map((product, index) => (
                  <div key={index} className={cx("content-project")}>
                    <h3 className={cx("content-project-title")}>
                      {product.title}
                    </h3>
                    <p className={cx("content-project-time")}>{product.time}</p>
                    <div className={cx("content-project-preview")}>
                      <img src={product.images[0]} alt={product.title} />
                    </div>
                    <div className={cx("content-project-description")}>
                      <p>{product.paragraph[0]}</p>
                    </div>
                    <ul className={cx("content-project-pictures")}>
                      {product.images.slice(0, 5).map((picture, index) => (
                        <li
                          key={index}
                          className={cx("content-project-picture")}
                        >
                          <img
                            src={picture}
                            alt={`Project image ${index + 1}`}
                          />
                          {index == 4 && product.images.length > 5 && (
                            <>
                              <div className={cx("content-project-number")}>
                                +{product.images.length - 5}
                              </div>
                              <div
                                className={cx("content-project-overlay")}
                              ></div>
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
                ))
              : null}
          </div>
          <div className={cx("content-extra")}>
            <div className={cx("content-extra-total")}>
              <div className={cx("products-catalog")}>
                <h3 className={cx("products-catalog-title")}>
                  Products Catalog
                </h3>
                <ul className={cx("products-catalog-items", "row")}>
                  {products
                    ? products.map((productCatalog, index) => (
                        <li
                          key={index}
                          className={cx("products-catalog-item", "col l-6")}
                        >
                          <a href="#">
                            <img
                              src={productCatalog.image}
                              alt={`Product ${index + 1}`}
                            />
                          </a>
                        </li>
                      ))
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
