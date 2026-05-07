import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function DarkMode({darkTheme, setDarkTheme}){

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    if(!darkTheme){
      document.querySelector("body").setAttribute("data-theme", "dark");
    }else document.querySelector("body").setAttribute("data-theme", "light");
  }
  return(
    <>
    <button
      className="dark-mood-btn"
      onClick={() => toggleTheme()}
    >
    {darkTheme 
    ? <FontAwesomeIcon icon={faSun} style={{color: "white"}}/> 
    : <FontAwesomeIcon icon={faMoon} flip="horizontal" style={{color: "black"}}/>}
    </button>
    </>
  )
}

export default DarkMode;