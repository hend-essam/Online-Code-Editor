import useKeyPress from "../hooks/useKeyPress"
import { useEffect } from "react";

function SaveBtn({handleSave, edited, setIsCodeEdited}){

  const ctrl = useKeyPress("Control");
  const s = useKeyPress("s");

  useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === 's') {
          event.preventDefault();
          handleSave()
          setIsCodeEdited(false)
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
  }, [ctrl, s]);

  return(
    <div className='save'>
      <div className="save-btn" style={{backgroundColor:`${edited ? 'green' :'#292929'}`}} 
      onClick={() => {handleSave(); setIsCodeEdited(false) }}>
        Save
      </div>
      <span>Ctrl+S to save</span>
    </div>
  )
}

export default SaveBtn;