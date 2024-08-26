import { useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

function SelectFile({ selectedFile, setSelectedFile, setCode }) {
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const setFileMemoized = useCallback(setCode, [setCode]);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = () => {
        setFileMemoized(reader.result);
      };
    }
  }, [selectedFile, setFileMemoized]);

  return (
    <label className="uploud_file">
      <input type="file" onChange={handleFileInputChange} hidden />
      <FontAwesomeIcon icon={faFolderOpen} />
    </label>
  );
}

export default SelectFile;
