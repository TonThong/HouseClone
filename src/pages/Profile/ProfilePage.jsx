import Header from "~/pages/components/Header/Header";
import Button from "~/components/Button/Button";
import PopUpAddFolder from "~/components/PopupAddFolder/PopupAddFolder";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./ProfilePage.module.scss";

const cx = classNames.bind(styles);

function Profile() {
  const [gmail] = useState(localStorage.getItem("gmail") || "");

  const [listTitleFolder, setListTitleFolder] = useState(() =>
    JSON.parse(
      localStorage.getItem(`list-title-folder-${gmail}`) || '{"title":[]}'
    )
  );
  const [listFolder, setListFolder] = useState(() =>
    JSON.parse(localStorage.getItem(`list-folder-${gmail}`) || "[]")
  );
  const [images, setImages] = useState({});
  const [title, setTitle] = useState({});

  const overlayRef = useRef(null);
  const wrapperRef = useRef(null);
  const listFolderRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const uniqueProjectIds = [...new Set(listFolder.flat())];
        const responses = await Promise.all(
          uniqueProjectIds.map((id) =>
            fetch(`https://house-clone-api.vercel.app/projects/${id}`)
          )
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
        console.error("Error fetching data:", error);
      }
    };

    if (listFolder.length) {
      fetchImages();
    }
  }, [gmail]);

  useEffect(() => {
    setListTitleFolder(
      JSON.parse(
        localStorage.getItem(`list-title-folder-${gmail}`) || '{"title":[]}'
      )
    );
    setListFolder(
      JSON.parse(localStorage.getItem(`list-folder-${gmail}`) || "[]")
    );
  }, [gmail]);

  const updateFolderData = (newListTitleFolder, newListFolder) => {
    setListTitleFolder(newListTitleFolder);
    setListFolder(newListFolder);
  };

  const [showFolder, setShowFolder] = useState(false);
  const [indexFolder, setIndexFolder] = useState(0);

  const handleDelete = (folderIndex, itemIndex) => {
    const updatedListFolder = listFolder.map((folder, idx) => {
      if (idx === folderIndex) {
        return folder.filter((_, i) => i !== itemIndex);
      }
      return folder;
    });
    localStorage.setItem(
      `list-folder-${gmail}`,
      JSON.stringify(updatedListFolder)
    );

    console.log(JSON.parse(localStorage.getItem(`list-folder-${gmail}`)));
    setListFolder(JSON.parse(localStorage.getItem(`list-folder-${gmail}`)));
  };
  setTimeout(() => {
    localStorage.setItem(`list-folder-${gmail}`, JSON.stringify(listFolder));
  }, 0);

  return (
    <>
      <Header />
      <PopUpAddFolder
        className={cx("popup-add-folder")}
        references={{ overlayRef, wrapperRef, listFolderRef }}
        updateFolderData={updateFolderData}
      />
      <div className={cx("wrapper", "grid wide")}>
        <div className={cx("content")}>
          <div className={cx("profile-info")}>
            <div className={cx("profile-info-content")}>
              <img
                className={cx("profile-image")}
                src="https://house-clone-api.vercel.app/src/images/user.jpg"
                alt="Profile"
              />
              <div className={cx("profile-name")}>
                {localStorage.getItem(`name-${gmail}`)}
              </div>
              <div className={cx("profile-email")}>{gmail}</div>
              <div className={cx("folder")}>
                <h3>Folders</h3>
                <div
                  onClick={() => {
                    overlayRef.current.style.visibility = "visible";
                    wrapperRef.current.style.visibility = "visible";
                  }}
                >
                  + Add Folder
                </div>
                <ul>
                  {listTitleFolder.title.map((titleFolder) => {
                    return <li key={titleFolder}>{titleFolder}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className={cx("list-folder")}>
            <div className={cx("list-folder-content")}>
              {showFolder ? null : (
                <div
                  className={cx("add-folder")}
                  onClick={() => {
                    overlayRef.current.style.visibility = "visible";
                    wrapperRef.current.style.visibility = "visible";
                  }}
                >
                  +
                </div>
              )}

              {showFolder ? (
                <>
                  <div className={cx("folder-content-title")}>
                    <div>{listTitleFolder.title[indexFolder]}</div>
                    <Button
                      onClick={() => {
                        setShowFolder(false);
                        setIndexFolder(null);
                      }}
                    >
                      X
                    </Button>
                  </div>
                  {listFolder[indexFolder].map((id, index) => {
                    return (
                      <div
                        className={cx("folder-image")}
                        key={`project-div-${index}`}
                      >
                        <Button
                          className={cx("delete-btn")}
                          onClick={() => {
                            handleDelete(indexFolder, index);
                          }}
                        >
                          Delete
                        </Button>
                        <Link to={`/${id}`} key={`project-${index}`}>
                          {images[id] ? <img src={images[id]} alt="" /> : null}
                          <div>{title[id]}</div>
                        </Link>
                      </div>
                    );
                  })}
                </>
              ) : (
                listTitleFolder.title.map((titleFolder, folderIndex) => {
                  const currentFolder = [...listFolder[folderIndex]];
                  while (currentFolder.length < 4) {
                    currentFolder.push(null);
                  }

                  return (
                    <div
                      key={`folder-${folderIndex}`}
                      className={cx("items-folder")}
                      onClick={() => {
                        setShowFolder(true);
                        setIndexFolder(folderIndex);
                      }}
                    >
                      {currentFolder.map((item, itemIndex) =>
                        itemIndex < 4 ? (
                          <div
                            key={`item-${folderIndex}-${itemIndex}`}
                            className={cx("folder-images")}
                          >
                            {item ? (
                              <img
                                src={images[listFolder[folderIndex][itemIndex]]}
                                alt="Hello"
                              />
                            ) : null}
                          </div>
                        ) : null
                      )}
                      <div className={cx("folder-title")}>{titleFolder}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
