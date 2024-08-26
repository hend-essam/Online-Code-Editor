import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCopy, faCheck, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Output({outputDetails , activePart, deletOutput, setDeletOutput}){
  const [copyText, setCopyText] = useState();
  const [copyIcon, setCopyIcon] = useState(faCopy);

  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // error
      return (
        <div className="result">
        {atob(outputDetails?.compile_output)}
        </div>
      );
    } else if (statusId === 3) {
      return (
        <div className="result">
        {atob(outputDetails.stdout) !== null
          ? atob(outputDetails.stdout)
          : null}
        </div>
      );
    } else if (statusId === 5) {
      return (
        <div className="result">
          Time Limit Exceeded
        </div>
      );
    } else {
      return (
        <div className="color_red result">
        {atob(outputDetails?.stderr)}
        </div>
      );
    }
  };

  useEffect(() => {
    const result = document.getElementsByClassName('result')[0]?.innerText;
    setCopyText(result);
  }, [outputDetails]);
  
  const downloadTxtFile = () => {
    if(!deletOutput){
      const element = document.createElement("a");
      const file = new Blob([copyText], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "myFile.txt";
      document.body.appendChild(element);
      element.click();
    }
  }

  const copy = () => {
    if(!deletOutput){
      navigator.clipboard.writeText(copyText)
      setCopyIcon(faCheck)
      setTimeout(() => {
        setCopyIcon(faCopy)
      }, 2000);
    }
  }

  return (
    <div className={`output ${activePart === "output" ? "active" : "hidden"}`}>
      <div className="output-area">
        {outputDetails && !deletOutput ? <>{getOutput()}</> : null}
      </div>
      <section className={`output-options ${!deletOutput ? "enable" : "disable"}`}>
      <FontAwesomeIcon icon={faBan} onClick={() => setDeletOutput(true)} />
      <FontAwesomeIcon icon={copyIcon} onClick={copy}/>
      <FontAwesomeIcon icon={faDownload} onClick={downloadTxtFile}/>
      </section>
    </div>
  );
}
export default Output;