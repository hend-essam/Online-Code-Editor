import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Folder({ folder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCreateNestedFile, setOpenCreateNestedFile] = useState(false);

  return (
    <section className="nested-folder">
      <div className="folder-head" onClick={() => setIsOpen(!isOpen)}>
        <h3>{folder.name}</h3>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {isOpen && (
        <>
          <div className="creat-file">
            <div
              className="creat-file-icon"
              onClick={() => setOpenCreateNestedFile(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
              <h4>Create File</h4>
            </div>
          </div>
          {openCreateNestedFile && (
            <>
              <input
                type="text"
                /* value={nestedFileName}
              onChange={(e) => setNestedFileName(e.target.value)} */
              />
              <div className="create-file-btn-icon">
                <div className="create-file-btn">
                  <button /* onClick={handleAddFile} */>Save</button>
                  <button onClick={() => setOpenCreateNestedFile(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default Folder;
