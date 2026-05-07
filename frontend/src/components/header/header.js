import ListIcon from "./listIcon";
import SaveBtn from "./saveBtn";
import FileTitle from "./fileTitle";
import SelectFile from "./selectFile";
import DownloudCode from "./downloudCode";
import SelectLanguage from "../language/selectLanguage";
import SelectTheme from "../theme/SelectTheme";
import RunBtn from "./runButton";
import DarkMode from "./darkMode";
import LoginIcon from "./loginIcon";
import IdeMode from "./ideMode";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

function Header({
  openList,
  setOpenList,
  isCodeEdited,
  handleSave,
  setIsCodeEdited,
  fileName,
  selectedFile,
  setSelectedFile,
  setExample,
  code,
  example,
  language,
  onSelectChange,
  darkTheme,
  changeTheme,
  theme,
  handleCompile,
  processing,
  setDarkTheme,
  setOpenSignIn,
  verticalIDE,
  setVerticalIDE,
}){
  const { currentUser } = useContext(AuthContext);
  return(
    <div className="header">
      <div className="header_part1">
        <div className={currentUser ? "available" : "unavailable"}>
          <span>Please Sign In</span>
        </div>            
        <ListIcon
        openList={openList} 
        setOpenList={setOpenList} 
        />

        <SaveBtn 
        edited={isCodeEdited} 
        handleSave={handleSave} 
        setIsCodeEdited={setIsCodeEdited}
        />

        <FileTitle value={fileName} />

        <SelectFile
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setExample={setExample}
        />

        <DownloudCode 
        example={example}
        language={language} 
        />

        <SelectLanguage
        onSelectChange={onSelectChange}
        darkTheme={darkTheme}
        />

        <SelectTheme
        changeTheme={changeTheme}
        theme={theme}
        darkTheme={darkTheme}
        />
      </div>
      
      <div className="header-part2">
        <RunBtn
        handleCompile={handleCompile}
        code={code}
        processing={processing}
        />

        <DarkMode
        darkTheme={darkTheme} 
        setDarkTheme={setDarkTheme} 
        />

        <LoginIcon setOpenSignIn={setOpenSignIn} />

        <IdeMode
        verticalIDE={verticalIDE}
        setVerticalIDE={setVerticalIDE}
        />
      </div>
    </div>
  )
}

export default Header;