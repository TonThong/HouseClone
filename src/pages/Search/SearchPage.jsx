import Header from "~/pages/components/Header/Header";
import Footer from "~/pages/components/Footer/Footer";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SearchPage.module.scss";

const cx = classNames.bind(styles);

function SearchPage({ ...props }) {
  const location = useLocation();
  const [data, setData] = useState();
  const [path, setPath] = useState(location.pathname);

  const pathApi = "https://house-clone-api.vercel.app/" + path;

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

  console.log(data);
  // console.log(path);

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
                    <img src={"/" + image}></img>
                  </div>
                );
              })
            ) : null
          ) : path == "/search/projects" ? (
            data?.projects ? (
              <div className={cx("content-main")}>
                <div className={cx("projects")}>
                  {data.projects.map((project, index) => {
                    return (
                      <div key={index} className={cx("project")}>
                        <img src={"/" + project.img}></img>
                        <div className={cx("project-title")}>
                          <p>{project.type}</p>
                          <h3>{project.title}</h3>
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
                            <li key={index} className={cx("offices-item")}>
                              <img src={"/" + office.images} />
                              <h4>{office.name}</h4>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
                <div className={cx("projects")}>
                  {data.projects.map((project, index) => {
                    return (
                      <div key={index} className={cx("project")}>
                        <img src={"/" + project.img}></img>
                        <div className={cx("project-title")}>
                          <p>{project.type}</p>
                          <h3>{project.title}</h3>
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
                        <img src={"/" + product.img}></img>
                        <div className={cx("product-title")}>
                          <p>{product.type}</p>
                          <h3>{product.title}</h3>
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
                              <img src={"/" + office.images} />
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
                        <img src={"/" + product.img}></img>
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
                              <div>
                                <img src={"/" + image}></img>
                              </div>
                            );
                          })}
                        </div>
                        <div className={cx("professional-description")}>
                          <div className={cx("professional-name")}>
                            <h3>{professional.name}</h3>
                            <h4>{professional.type}</h4>
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
