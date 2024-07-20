import Header from "~/pages/components/Header/Header";
import Footer from "~/pages/components/Footer/Footer";
import Button from "~/components/Button/Button";

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SearchPage.module.scss";

const cx = classNames.bind(styles);

function SearchPage({ ...props }) {
  const location = useLocation();
  const [data, setData] = useState();
  const [path, setPath] = useState(location.pathname);

  const [images, setImages] = useState({});
  const [title, setTitle] = useState({});

  const pathApi = "https://house-clone-api.vercel.app" + path;
  const pathMain = "https://house-clone-api.vercel.app";
  // const pathApi = "http://localhost:3000" + path;
  // const pathMain = "http://localhost:3000";

  if (path != location.pathname) {
    setPath(location.pathname);
  }

  useEffect(() => {
    fetch(pathApi)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  }, [path]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const uniqueProjectIds = [...new Set(data.projects.flat())];
        const responses = await Promise.all(
          uniqueProjectIds.map((id) => fetch(`${pathMain}/projects/${id}`))
        );
        const dataArr = await Promise.all(responses.map((res) => res.json()));

        const imagesData = dataArr.reduce((acc, data, index) => {
          acc[uniqueProjectIds[index]] = data.images[0];
          return acc;
        }, {});

        const titlesData = dataArr.reduce((acc, data, index) => {
          acc[uniqueProjectIds[index]] = data.title;
          return acc;
        }, {});

        setImages(imagesData);
        setTitle(titlesData);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
    fetchImages();
  }, [data]);

  console.log(data);
  return (
    <>
      <Header />
      <div className={cx("wrapper", "grid wide content")}>
        {data ? (
          <div className={cx("introduce")}>
            <div className={cx("title")}>
              <h3>{data.title}</h3>
              <div>{data.numberResults} Results</div>
            </div>
            <p className={cx("introduce-description")}>{data.description}</p>
          </div>
        ) : null}
        <div className={cx("filter")}>
          {data ? (
            <form>
              <ul className={cx("filter-items")}>
                {data.filters.map((filter, index) => {
                  return (
                    <label key={index} htmlFor={"filter" + index}>
                      <li key={index} className={cx("filter-item")}>
                        <input
                          id={"filter" + index}
                          type="radio"
                          name="filter"
                          value={filter}
                          className={cx("filter-check")}
                        ></input>
                        {filter}
                      </li>
                    </label>
                  );
                })}
              </ul>
            </form>
          ) : null}
        </div>
        <div className={cx("content", "grid wide row")}>
          {path == "/search/images" ? (
            data?.images ? (
              data.images.map((image) => {
                return (
                  <div className={cx("image", "col l-4")}>
                    <Button
                      className={cx("save-btn")}
                      onClick={() => {
                        alert("Image saved successfully!");
                      }}
                    >
                      Save
                    </Button>
                    <img src={image}></img>
                  </div>
                );
              })
            ) : null
          ) : path == "/search/projects" ? (
            data?.projects ? (
              <div className={cx("content-main")}>
                <div className={cx("projects")}>
                  {data.projects.map((projectID, index) => {
                    return (
                      <div key={index} className={cx("project")}>
                        <img src={images[projectID]}></img>
                        <div className={cx("project-title")}>
                          <Link to={`/${projectID}`}>
                            <p>{"Project News"}</p>
                          </Link>
                          <Link to={`/${projectID}`}>
                            <h3>{title[projectID]}</h3>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={cx("offices")}>
                  <h3>Related Architectural Offices</h3>
                  <ul className={cx("offices-items")}>
                    {data
                      ? data.offices.map((office, index) => {
                          return (
                            <li
                              key={index}
                              className={cx("offices-item")}
                              onClick={() => {
                                alert("Updating the offices...");
                              }}
                            >
                              <img src={office.images} />
                              <h4>{office.name}</h4>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
                <div className={cx("projects")}>
                  {data.projects.map((projectID, index) => {
                    return (
                      <div key={index} className={cx("project")}>
                        <img src={images[projectID]}></img>
                        <div className={cx("project-title")}>
                          <Link to={`/${projectID}`}>
                            <p>{"Project News"}</p>
                          </Link>
                          <Link to={`/${projectID}`}>
                            <h3>{title[projectID]}</h3>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null
          ) : path == "/search/products" ? (
            data?.products ? (
              <div className={cx("content-main")}>
                <div className={cx("products")}>
                  {data.products.map((product, index) => {
                    return (
                      <div key={index} className={cx("product")}>
                        <img src={product.img}></img>
                        <div className={cx("product-title")}>
                          <Link
                            onClick={() => {
                              alert("Updating product...");
                            }}
                          >
                            <p>{product.type}</p>
                          </Link>
                          <Link
                            onClick={() => {
                              alert("Updating product...");
                            }}
                          >
                            <h3>{product.title}</h3>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={cx("offices")}>
                  <h3>Related Architectural Offices</h3>
                  <ul className={cx("offices-items")}>
                    {data
                      ? data.offices.map((office) => {
                          return (
                            <li className={cx("offices-item")}>
                              <img src={office.images} />
                              <h4>{office.name}</h4>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
                <div className={cx("products")}>
                  {data.products.map((product, index) => {
                    return (
                      <div key={index} className={cx("product")}>
                        <img src={product.img}></img>
                        <div className={cx("product-title")}>
                          <p>{product.type}</p>
                          <h3>{product.title}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null
          ) : path == "/search/professionals" ? (
            <div className={cx("content-professional")}>
              {data?.professionals
                ? data.professionals.map((professional) => {
                    return (
                      <div className={cx("professional")}>
                        <div className={cx("professional-img")}>
                          {professional.images.map((image) => {
                            return (
                              <div
                                onClick={() => {
                                  alert("Updating this expert...");
                                }}
                              >
                                <img src={image}></img>
                              </div>
                            );
                          })}
                        </div>
                        <div className={cx("professional-description")}>
                          <div className={cx("professional-name")}>
                            <h3
                              onClick={() => {
                                alert("Updating this expert...");
                              }}
                            >
                              {professional.name}
                            </h3>
                            <h4
                              onClick={() => {
                                alert("Updating this expert...");
                              }}
                            >
                              {professional.type}
                            </h4>
                          </div>
                          <div className={cx("professional-category")}>
                            <h3>
                              Expertise: <p>{professional.expertise}</p>
                            </h3>
                            <h3>
                              Projects categories:{" "}
                              <p>{professional.categories}</p>
                            </h3>
                            <h3>
                              Worked with: <p>{professional.workWith}</p>
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;
