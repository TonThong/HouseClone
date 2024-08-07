import Header from "~/pages/components/Header/Header";
import Footer from "~/pages/components/Footer/Footer";
import PopupAddFolder from "~/components/PopupAddFolder/PopupAddFolder";

import Button from "~/components/Button/Button";

import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./ProjectPage.module.scss";

const cx = classNames.bind(styles);

function ProjectPage() {
  const location = useLocation();
  const [data, setData] = useState();
  const [productsCatalog, setProductsCatalog] = useState([]);
  const [path, setPath] = useState("");

  const overlayRef = useRef(null);
  const wrapperRef = useRef(null);
  const listFolderRef = useRef(null);

  const pathApi = "https://house-clone-api.vercel.app/projects" + path;
  const pathMain = "https://house-clone-api.vercel.app";

  if (path != location.pathname) {
    setPath(location.pathname);
  }

  useEffect(() => {
    let fetchData = async () => {
      let products = await fetch(`${pathMain}/products`).then((res) =>
        res.json()
      );

      let res = await fetch(pathApi).then((res) => res.json());

      setData(res);
      setProductsCatalog(products);
    };
    fetchData();
  }, [path]);

  let id = path.replace("/", "");
  console.log(productsCatalog);

  return (
    <>
      <Header />
      <PopupAddFolder
        className={cx("popup-add-folder")}
        references={{ overlayRef, wrapperRef, listFolderRef }}
        updateFolderData={() => {}}
      />
      <div className={cx("wrapper", "grid wide content")}>
        <div className={cx("content")}>
          <Button
            className={cx("save-btn")}
            onClick={() => {
              overlayRef.current.style.visibility = "visible";
              wrapperRef.current.style.visibility = "visible";
              localStorage.setItem("project-save", `${id}`);
            }}
          >
            Save this project
          </Button>
          <h3 className={cx("title")}>{data ? data.title : null}</h3>
          <ul className={cx("picture-items")}>
            {data
              ? data.images.map((image, index) => {
                  if (index < 5) {
                    return (
                      <li key={index} className={cx("picture-item")}>
                        <img src={image} />
                      </li>
                    );
                  }
                  if (index == 5) {
                    return (
                      <li key={index} className={cx("picture-item")}>
                        <img src={image} />
                        <div className={cx("overlay")}>
                          +{data.images.length - 6}
                        </div>
                      </li>
                    );
                  }
                })
              : null}
          </ul>
          {data ? (
            <ul className={cx("specs")}>
              <div className={cx("specs-title")}>Specs</div>
              <li className={cx("spec")}>
                Architect<p>{data.specs.architect}</p>
              </li>
              <li className={cx("spec")}>
                Area<p>{data.specs.area}</p>
              </li>
              <li className={cx("spec")}>
                Year<p>{data.specs.Year}</p>
              </li>
              <li className={cx("spec")}>
                Photographs<p>{data.specs.Photographs}</p>
              </li>
              <li className={cx("spec")}>
                Lead Architects<p>{data.specs.leadArchitects}</p>
              </li>
              <li className={cx("spec")}>
                Manufacturers<p>{data.specs.Manufacturers}</p>
              </li>
            </ul>
          ) : null}
          <div className={cx("blogs")}>
            {data
              ? data.paragraph.map((paragraph, index) => {
                  return (
                    <div key={index} className={cx("blog-content")}>
                      <img src={data.images[index]}></img>
                      <p>{paragraph}</p>
                    </div>
                  );
                })
              : null}
          </div>
          <div className={cx("project-gallery")}>
            <h3>Project Gallery</h3>
            <ul>
              {data
                ? data.images.map((image, index) => {
                    return (
                      <li key={index}>
                        <img src={image} />
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
        <div className={cx("content-extra")}>
          <div className={cx("content-extra-total")}>
            <div className={cx("products-catalog", "grid wide")}>
              <h3 className={cx("products-catalog-title")}>Products Catalog</h3>
              <ul className={cx("products-catalog-items", "row")}>
                {productsCatalog
                  ? productsCatalog.map((productCatalog, index) => {
                      return (
                        <li
                          key={index}
                          className={cx("products-catalog-item", "col l-6")}
                        >
                          <img src={productCatalog.image}></img>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProjectPage;
