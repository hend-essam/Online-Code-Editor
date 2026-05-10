import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import { Theme } from "./theme/Themes";
import { languages } from "./language/languages";
import Output from "./output";
import UserInput from "./userInput";
import OutputDetails from "./outputDetails";
import axios from "axios";
import SignIn_SignUp from "./signIn-signUp/main";
import List from "./folders & files/list";
import FileName from "./folders & files/fileName";
import { getFile, saveFile, saveFileById } from "../libs/auth";
import Header from "./header/header";

function Home() {
  const [theme, setTheme] = useState("brilliance-black");
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState(`console.log("Hello World");`);
  const [processing, setProcessing] = useState(null);
  const [userInput, setUserInput] = useState();
  const [outputDetails, setOutputDetails] = useState(null);
  const [example, setExample] = useState(`console.log("Hello World");`);
  const [activePart, setActivePart] = useState("output");
  const [openList, setOpenList] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deletOutput, setDeletOutput] = useState(true);
  const [verticalIDE, setVerticalIDE] = useState(true);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openFileName, setOpenFileName] = useState(false);
  const [isCodeEdited, setIsCodeEdited] = useState(false);
  const [fileName, setFileName] = useState("untiteld.js");
  const [files, setFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);

  useEffect(() => {
    setExample(example)
  },[example, code])

  const handleFileNames = (name, fileId = null) => {
    setFileName(name);
    setActiveFileId(fileId);
  };

  const handleInputChange = (val) => {
    setFileName(val);
  };

  const createFile = async (f) => {
    const res = await saveFile({ fileName: f, fileContent: " " });
    setFiles([...files, res]);
  };

  // change theme
  function changeTheme(theme) {
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      Theme(theme.value).then((_) => setTheme(theme));
    }
  }
  //////////////////////////////////////

  // toggle theme (light and dark)
  useEffect(() => {
    const toggleTheme = () => {
      if (darkTheme) {
        Theme("clouds-midnight").then((_) =>
          setTheme({ value: "clouds-midnight", label: "Clouds Midnight" })
        );
      } else {
        Theme("lazy").then((_) => setTheme({ value: "lazy", label: "LAZY" }));
      }
    };
    toggleTheme();
  }, [darkTheme]);
  //////////////////////////////////////

  useEffect(() => {
    if (selectedFile === null) {
      setExample(language.code);
    }
    setUserInput("");
  }, [selectedFile, language.code, setUserInput, setExample]);
  //////////////////////////////////////

  // change language in select
  const onSelectChange = (select) => {
    setLanguage(select);
  };
  //////////////////////////////////////
  const fetchCode = (val) => {
    setCode(val);
    setExample(val);
  };

  //handle when user edit the code

  //run time error
  /* useEffect(() => {
    handleEditing()
  }, [example]) */

  const handleEditing = (val) => {
    setIsCodeEdited(val);
  };
  
  // change value in code editor
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        setExample(data)
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  //////////////////////////////////////
  useEffect(() => {
    const fetchfile = async () => {
      const res = await getFile();
      if (res.content) {
        setExample(res.content);
        setCode(res.content);
        setFileName(res.name);
      }
    };
    fetchfile();
  }, []);

  const handleCompile = () => {
    setProcessing(true);
    setActivePart("output");
    setOutputDetails("");
    const options = {
      method: "POST",
      url: process.env.REACT_APP_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      },
      data: {
        language_id: language.id,
        source_code: btoa(example),
        stdin: btoa(userInput),
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("many requests", status);
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // when i find a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        setDeletOutput(false);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    }
  };

  const handleSave = async () => {
    if (activeFileId) {
      await saveFileById(activeFileId, code);
    } else {
      await saveFile({ fileName, fileContent: code });
    }
    const existingFile = files.find((file) => file.name === fileName);
    if (existingFile) {
      const updatedFiles = files.filter((file) => file.name !== fileName);
      existingFile.content = code;
      setFiles([existingFile, ...updatedFiles]);
    }
  };
  const handlesaveFiles = (val) => {
    setFiles(val);
  };
  const handleFileName = (val) => {
    setFileName(val);
  };

  return (
  <>
  <div className="flex_column">
    <Header 
    openList={openList} 
    setOpenList={setOpenList} 
    isCodeEdited={isCodeEdited}
    handleSave={handleSave} 
    setIsCodeEdited={setIsCodeEdited}
    fileName={fileName}
    selectedFile={selectedFile}
    setSelectedFile={setSelectedFile}
    setExample={setExample}
    code={code}
    example={example} 
    language={language?.extension}
    onSelectChange={onSelectChange}
    darkTheme={darkTheme}
    changeTheme={changeTheme}
    theme={theme}
    handleCompile={handleCompile}
    processing={processing}
    setDarkTheme={setDarkTheme} 
    setOpenSignIn={setOpenSignIn}
    verticalIDE={verticalIDE}
    setVerticalIDE={setVerticalIDE}
    />

    <main className="flex_row main-direction">
      <div className="input-part">
        <CodeEditor
          code={code}
          onChange={onChange}
          theme={theme.value}
          language={language?.value}
          example={example}
          handleEditing={handleEditing}
        />
      </div>
      <div className="output-part">
        <section className="output-input">
          <ul
            className={`${
              !darkTheme && !verticalIDE
                ? "light-shadow"
                : darkTheme && !verticalIDE
                ? "dark-shadow"
                : ""
            }`}
          >
            <li
              onClick={() => setActivePart("output")}
              className={activePart === "output" ? "active" : ""}
            >
              Output
            </li>
            <li
              onClick={() => setActivePart("input")}
              className={activePart === "input" ? "active" : ""}
            >
              Input
            </li>
          </ul>
          <Output
            outputDetails={outputDetails}
            activePart={activePart}
            deletOutput={deletOutput}
            setDeletOutput={setDeletOutput}
          />
          <UserInput
            userInput={userInput}
            setUserInput={setUserInput}
            activePart={activePart}
          />
        </section>
        <OutputDetails outputDetails={outputDetails} />
      </div>
    </main>

    <List
      openList={openList}
      fetchCode={fetchCode}
      files={files}
      setFiles={handlesaveFiles}
      createFile={createFile}
      fileName={fileName}
      handleInputChange={handleInputChange}
      handleFileNames={handleFileNames}
      setActiveFileId={setActiveFileId}
    />

    <SignIn_SignUp 
      openSignIn={openSignIn}
      setOpenSignIn={setOpenSignIn} 
    />

    <FileName
      openFileName={openFileName}
      setOpenFileName={setOpenFileName}
      setFile={handleFileName}
      fileName={fileName}
      saveCode={handleSave}
    />
  </div>
  </>
  );
}

export default Home;
