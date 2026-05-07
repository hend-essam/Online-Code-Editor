import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function DownloudCode({example, language}){

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([example], {type: 
      language === undefined 
      ? language = "js" 
      : language});
    element.href = URL.createObjectURL(file);
    element.download = `myCode.${language}`;
    document.body.appendChild(element);
    element.click();
  }
  return(
    <div className="downloud-code" onClick={downloadTxtFile}>
      <FontAwesomeIcon icon={faDownload} />
    </div>
  )
}

export default DownloudCode;