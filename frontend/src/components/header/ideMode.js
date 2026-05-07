import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

function IdeMode({verticalIDE, setVerticalIDE}){
  const toggleMode = () => {
    setVerticalIDE(!verticalIDE);
    if(!verticalIDE){
      document.querySelector("main").setAttribute("data-mode", "vertical");
    }else document.querySelector("main").setAttribute("data-mode", "horizontal");
  }

  return(
    <div className="ide-mode" onClick={toggleMode}>
    <FontAwesomeIcon icon={faGripVertical} className={verticalIDE ? "rotate-icon" : ""}/>
    </div>
  )
}

export default IdeMode;