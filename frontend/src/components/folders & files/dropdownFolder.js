import Folder from "./folder";

function DropdownFolder({
  nestedFolders,
}){

  return(
    <>
    {nestedFolders.map((folder) => {
      return <Folder folder={folder} />
    })}
    </>
    )
}

export default DropdownFolder;