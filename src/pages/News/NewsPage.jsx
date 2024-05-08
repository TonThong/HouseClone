import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";

import Button from "~/components/Button/Button";
import Header from "~/pages/components/Header/Header";
import Footer from "~/pages/components/Footer/Footer";

import classNames from "classnames/bind";
import styles from "./NewsPage.module.scss";

const cx = classNames.bind(styles);

function NewsPage({ ...props }) {
  const [products, setProducts] = useState([]);
  const [productsCatalog, setProductsCatalog] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/home")
      .then((res) => res.json())
      .then((items) => {
        setProductsCatalog(items[4].productsCatalog);
        setProducts(items[5].projects);
        setCount(1);
      });
  }, [count]);

  return (
    <>
      <Header />
      <div className={cx("wrapper", "grid wide content")}>
        <h3 className={cx("title")}>Architecture News</h3>
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
                        <Button text className={cx("read-btn")}>
                          Read More
                        </Button>
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

export default NewsPage;
