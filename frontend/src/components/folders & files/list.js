import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  editFile,
  deleteFile,
  getFolders,
  createFolder,
} from "../../libs/auth";
import DropdownFolder from "./dropdownFolder";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function List({
  openList,
  fetchCode,
  files,
  setFiles,
  createFile,
  handleFileNames,
}) {
  const [folders, setFolders] = useState("Root Folder");
  const [nestedFolders, setNestedFolders] = useState([]);
  const [nestedFolderName, setNestedFolderName] = useState("");
  const [openCreateFile, setOpenCreateFile] = useState(false);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const [fileName, setFileName] = useState("");
  const [editingFile, setEditingFile] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchFolders = async () => {
      const folders = await getFolders();
      console.log(folders);
      if (folders[0]) {
        setFolders(folders[0].name);
        setNestedFolders(folders[0].folders);
        setFiles(folders[0].files);
      }
    };
    fetchFolders();
  }, []);

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

  const handleCreateFolder = async () => {
    const res = await createFolder({ name: nestedFolderName });
    console.log(nestedFolders);
    console.log(res);
    setNestedFolders([...nestedFolders, res]);
    console.log(nestedFolders);
  };

  return (
    <section
      className={`list ${openList === true ? "list_open" : "list_close"}`}
    >
      <section className="folder">
        <div className="folder-head" onClick={() => setIsOpen(!isOpen)}>
          <h2>{folders}</h2>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {isOpen && (
          <section className="drop-down-folder">
            <div className="creat-file">
              <div
                className="creat-file-icon"
                onClick={() => setOpenCreateFolder(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h4>Create Folder</h4>
              </div>
              {openCreateFolder && (
                <>
                  <input
                    type="text"
                    value={nestedFolderName}
                    onChange={(e) => setNestedFolderName(e.target.value)}
                  />
                  <div className="create-file-btn-icon">
                    <div className="create-file-btn">
                      <button
                        onClick={() => handleCreateFolder(nestedFolderName)}
                      >
                        Save
                      </button>
                      <button onClick={() => setOpenCreateFolder(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="creat-file">
              <div
                className="creat-file-icon"
                onClick={() => setOpenCreateFile(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h4>Create File</h4>
              </div>
              {openCreateFile && (
                <>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                  <div className="create-file-btn-icon">
                    <div className="create-file-btn">
                      <button onClick={() => createFile(fileName)}>Save</button>
                      <button onClick={() => setOpenCreateFile(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <DropdownFolder
              nestedFolders={nestedFolders}
              nestedFolderName={nestedFolderName}
            />
            {files.map((file) => (
              <div
                onClick={() => handleShowFile(file.content, file.name)}
                key={file._id}
              >
                <div className="file-option">
                  {editingFile && editingFile._id === file._id ? (
                    <>
                      <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                      />
                      <div className="create-file-icon">
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() => handleEditFileName(file.name)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDeleteClick(file.name)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>{file.name}</h4>
                      <div className="create-file-icon">
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() => handleEditClick(file)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDeleteClick(file.name)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
      </section>
    </section>
  );
}
export default List;
