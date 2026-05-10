import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createFileInFolder, editFileById, deleteFileById, getFileById } from "../../libs/auth";

function Folder({ folder, fetchCode, handleFileNames, setActiveFileId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCreateNestedFile, setOpenCreateNestedFile] = useState(false);
  const [nestedFileName, setNestedFileName] = useState("");
  const [error, setError] = useState("");
  const [files, setFiles] = useState(folder.files || []);

  useEffect(() => {
    setFiles(folder.files || []);
  }, [folder.files]);
  const [editingFile, setEditingFile] = useState(null);
  const [editName, setEditName] = useState("");

  const handleAddFile = async () => {
    if (!nestedFileName.trim()) return setError("File name is required.");
    const res = await createFileInFolder(folder._id || folder.id, { fileName: nestedFileName, fileContent: "" });
    if (res?.error) return setError(res.error);
    setFiles((prev) => [...prev, res]);
    setNestedFileName("");
    setOpenCreateNestedFile(false);
    setError("");
  };

  const handleEditClick = (file) => {
    setEditingFile(file);
    setEditName(file.name);
  };

  const handleEditSave = async (file) => {
    if (!editName.trim()) return;
    const res = await editFileById(file._id, editName);
    if (res?.error) return;
    setFiles((prev) => prev.map((f) => (f._id === file._id ? { ...f, name: editName } : f)));
    setEditingFile(null);
    setEditName("");
  };

  const handleDelete = async (file) => {
    const res = await deleteFileById(file._id);
    if (res?.error) return;
    setFiles((prev) => prev.filter((f) => f._id !== file._id));
  };

  const handleShowFile = async (file) => {
    const fresh = await getFileById(file._id);
    const content = fresh?.content ?? file.content;
    if (fetchCode) fetchCode(content);
    if (handleFileNames) handleFileNames(file.name, file._id);
    if (setActiveFileId) setActiveFileId(file._id);
    setFiles((prev) => prev.map((f) => f._id === file._id ? { ...f, content } : f));
  };

  return (
    <section className="nested-folder">
      <div className="folder-head" onClick={() => setIsOpen(!isOpen)}>
        <h3>{folder.name}</h3>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {isOpen && (
        <>
          <div className="creat-file">
            <div className="creat-file-icon" onClick={() => setOpenCreateNestedFile(true)}>
              <FontAwesomeIcon icon={faPlus} />
              <h4>Create File</h4>
            </div>
          </div>
          {openCreateNestedFile && (
            <>
              <input
                type="text"
                value={nestedFileName}
                onChange={(e) => setNestedFileName(e.target.value)}
              />
              {error && <p style={{ color: "red", margin: "4px 0" }}>{error}</p>}
              <div className="create-file-btn-icon">
                <div className="create-file-btn">
                  <button onClick={handleAddFile}>Save</button>
                  <button onClick={() => { setOpenCreateNestedFile(false); setError(""); }}>
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
          {files.map((file) => (
            <div key={file._id} className="file-option" onClick={() => handleShowFile(file)}>
              {editingFile?._id === file._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="create-file-icon">
                    <FontAwesomeIcon icon={faPen} onClick={(e) => { e.stopPropagation(); handleEditSave(file); }} />
                    <FontAwesomeIcon icon={faTrash} onClick={(e) => { e.stopPropagation(); handleDelete(file); }} />
                  </div>
                </>
              ) : (
                <>
                  <h4>{file.name}</h4>
                  <div className="create-file-icon">
                    <FontAwesomeIcon icon={faPen} onClick={(e) => { e.stopPropagation(); handleEditClick(file); }} />
                    <FontAwesomeIcon icon={faTrash} onClick={(e) => { e.stopPropagation(); handleDelete(file); }} />
                  </div>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export default Folder;
