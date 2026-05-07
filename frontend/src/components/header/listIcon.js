import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function ListIcon({openList, setOpenList}){
  return(
    <div onClick={() => setOpenList(!openList)}>
      <FontAwesomeIcon icon={faBars} style={{fontSize: "21px", padding: "5px"}}/>
    </div>
  )
}

export default ListIcon;