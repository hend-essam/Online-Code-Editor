import Folder from "./folder";

function DropdownFolder({ nestedFolders, fetchCode, handleFileNames, setActiveFileId }) {

  return(
    <>
    {nestedFolders.map((folder) => {
      return <Folder key={folder._id || folder.id} folder={folder} fetchCode={fetchCode} handleFileNames={handleFileNames} setActiveFileId={setActiveFileId} />
    })}
    </>
    )
}

export default DropdownFolder;