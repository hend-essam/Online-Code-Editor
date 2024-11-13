import React, { useState, useEffect } from "react";
import DropdownMainFolder from "./dropdownMainFolder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { editFile, deleteFile, getFolders } from "../../libs/auth";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function List({
  openList,
  fetchCode,
  files,
  setFiles,
  createFile,
  handleFileNames,
}) {
  const [mainFolders, setMainFolders] = useState([]);
  const [mainfolderName, setMainFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [nestedFile, setNestedFile] = useState([])
  const [nestedFileName, setNestedFileName] = useState("")
  const [fileName, setFileName] = useState("");
  const [editingFile, setEditingFile] = useState(null);
  const [openCreateMainFolder, setOpenCreateMainFolder] = useState(false);

  useEffect(() => {
    const fetchFolders = async () => {
      const folders = await getFolders();
      if (folders[0]) {
        setMainFolders(folders);
        setFolders(folders[0].folders)
        setFiles(folders[0].files);
      }
    };
    fetchFolders();
  }, []);

  /* const handleAddFile = () => {
    const newNestedFile = {
      name: nestedFileName,
      id: nestedFile.length
    };
    setNestedFile([...nestedFile, newNestedFile]);
  };

  const handleAddFolder = () => {
    const newFolder = {
      name: folderName,
      files: nestedFile,
      id: folders.length
    };
    setFolders([...folders, newFolder]);
  };

  const handleAddMainFolder = () => {
    const newMainFolder = {
      name: mainfolderName,
      folders: folders,
      files: files,
      id: mainFolders.length + 1
    }
    setMainFolders([...mainFolders, newMainFolder]);
  }; */

  console.log(mainFolders)

  const handleShowFile = (content, name) => {
    fetchCode(content);
    handleFileNames(name);
  };

  const handleEditClick = (file) => {
    setEditingFile(file);
    setFileName(file.name);
  };

  const handleEditFileName = (f) => {
    const old = f;
    const updatedFiles = files.map((file) => {
      console.log(file, editingFile);
      if (file._id === editingFile._id) {
        return { ...file, name: fileName };
      }
      return file;
    });
    setFiles(updatedFiles);
    setEditingFile(null);
    editFile({ fileName: f, newFileName: fileName });
    setFileName("");
  };

  const handleDeleteClick = (name) => {
    deleteFile({ fileName: name });
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);
  };

  return (
    <section className={`list ${openList === true ? "list_open" : "list_close"}`}>
      <div className="creat-file">
        <div
          className="creat-file-icon"
          onClick={() => setOpenCreateMainFolder(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <h4>Create Main Folder</h4>
        </div>
      </div>
      {openCreateMainFolder && (
      <>
      <input
        type="text"
        value={mainfolderName}
        onChange={(e) => setMainFolderName(e.target.value)}
      />
      <div className="create-file-btn-icon">
        <div className="create-file-btn">
          <button /* onClick={handleAddMainFolder} */>Save</button>
          <button onClick={() => setOpenCreateMainFolder(false)}>Cancel</button>
        </div>
      </div>
      </>
      )}
      {mainFolders.map((mainFolder) => {
        return(
        <section className="main-folders" key={mainFolder.id}>
          <DropdownMainFolder
          folders={folders}
          nestedFileName={nestedFileName}
          setNestedFileName={setNestedFileName}
          nestedFile={nestedFile}
          mainFolder={mainFolder}
          folderName={folderName}
          setFolderName={setFolderName}
          fileName={fileName}
          setFileName={setFileName}
          createFile={createFile}
          files={files}
          handleShowFile={handleShowFile}
          editingFile={editingFile}
          handleEditFileName={handleEditFileName}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
         /*  handleAddFolder={handleAddFolder}
          handleAddFile={handleAddFile} */
          />
        </section>
        )
      })}
    </section>
  );
}
export default List;
