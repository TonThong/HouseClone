import classNames from "classnames/bind";
import styles from "./PopupAddFolder.module.scss";
import { useEffect, useRef, useState } from "react";

import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);

function PopUpAddFolder({ className, references, updateFolderData, ...props }) {
  let gmail = localStorage.getItem("gmail");

  let listTitleFolder = JSON.parse(
    localStorage.getItem(`list-title-folder-${gmail}`)
      ? localStorage.getItem(`list-title-folder-${gmail}`)
      : '{"title":[]}'
  );

  let temps = JSON.parse(
    localStorage.getItem(`list-folder-${gmail}`)
      ? localStorage.getItem(`list-folder-${gmail}`)
      : "[]"
  );

  const inputRef = useRef(null);
  const [listFolder, setListFolder] = useState(listTitleFolder.title);
  const [listItemFolder, setListItemFolder] = useState(temps);
  localStorage.setItem(
    `list-title-folder-${gmail}`,
    `{"title":[${listFolder.map((folder) => `"${folder}"`)}]}`
  );

  localStorage.setItem(
    `list-folder-${gmail}`,
    `[${listItemFolder.map((itemFolder) => `[${itemFolder}]`)}]`
  );

  return (
    <>
      <div
        className={cx("overlay")}
        ref={references.overlayRef}
        onClick={() => {
          let wrapper = document.querySelector(`.${cx("wrapper")}`);
          let overlay = document.querySelector(`.${cx("overlay")}`);
          wrapper.style.visibility = "hidden";
          overlay.style.visibility = "hidden";
          localStorage.setItem("project-save");
        }}
      ></div>
      <div className={cx("wrapper")} ref={references.wrapperRef}>
        <div className={cx("content-main")}>
          <input placeholder="Create new folder" ref={inputRef}></input>
          <div className={cx("list-folder")} ref={references.listFolder}>
            {listFolder.map((titleFolder, index) => {
              return (
                <div
                  key={`title-folder-${index}`}
                  className={cx("title-folder")}
                >
                  {titleFolder}
                  <Button
                    className={cx("add-btn")}
                    ref={references.addRef}
                    onClick={() => {
                      let projectId = JSON.parse(
                        localStorage.getItem("project-save")
                      );
                      console.log(projectId);
                      if (listItemFolder[index] && projectId) {
                        listItemFolder[index].push(`${projectId}`);
                        localStorage.setItem(
                          `list-folder-${gmail}`,
                          JSON.stringify(listItemFolder)
                        );
                        updateFolderData(listTitleFolder, listItemFolder);
                        alert("You saved successfully!");
                      }
                    }}
                  >
                    +
                  </Button>
                  <Button
                    className={cx("delete-btn")}
                    onClick={() => {
                      listTitleFolder.title.splice(index, 1);
                      setListFolder(listTitleFolder.title);
                      let temporary = listItemFolder;
                      temporary.splice(index, 1);
                      setListItemFolder(temporary);
                      updateFolderData(listTitleFolder, temporary);
                    }}
                  >
                    -
                  </Button>
                </div>
              );
            })}
          </div>
          <Button
            className={cx("save-btn")}
            onClick={() => {
              if (inputRef.current.value == "") {
                alert("Folder name cannot be empty!");
                return;
              }
              listTitleFolder.title.push(`${inputRef.current.value}`);
              setListFolder(listTitleFolder.title);
              let temporary = listItemFolder;
              temporary.push([]);
              setListItemFolder(temporary);
              updateFolderData(listTitleFolder, temporary);
            }}
          >
            Create new folder
          </Button>
        </div>
      </div>
    </>
  );
}

export default PopUpAddFolder;
