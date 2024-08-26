import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import SelectTheme from "./theme/SelectTheme";
import { Theme } from "./theme/Themes";
import SelectLanguage from "./language/selectLanguage";
import { languages } from "./language/languages";
import Output from "./output";
import UserInput from "./userInput";
import OutputDetails from "./outputDetails";
import axios from "axios";
import SelectFile from "./selectFile";
import DarkTheme from "./darkMode";
import RunBtn from "./runButton";
import DownloadCode from "./downloadCode";
import IdeMode from "./ideMode";

function Home() {
  const [theme, setTheme] = useState("brilliance-black");
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState();
  const [processing, setProcessing] = useState(null);
  const [userInput, setUserInput] = useState();
  const [outputDetails, setOutputDetails] = useState(null);
  const [activePart, setActivePart] = useState("output");
  const [darkTheme, setDarkTheme] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deletOutput, setDeletOutput] = useState(true);
  const [verticalIDE, setVerticalIDE] = useState(true);

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

  //change code when selected file
  useEffect(() => {
    if (selectedFile === null) {
      setCode(language.code);
    }
    setUserInput("");
  }, [selectedFile, language, setUserInput]);
  //////////////////////////////////////

  // change language in select
  const onSelectChange = (select) => {
    setLanguage(select);
  };
  //////////////////////////////////////

  // change value in code editor
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  //////////////////////////////////////

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
        source_code: btoa(code),
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

  return (
    <>
      <div className="flex_column">
        <div className="header">
          <div className="header_part1">
            <SelectFile
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setCode={setCode}
            />

            <DownloadCode code={code} language={language?.extension} />

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

            <DarkTheme darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

            <IdeMode
              verticalIDE={verticalIDE}
              setVerticalIDE={setVerticalIDE}
            />
          </div>
        </div>

        <main className="flex_row main-direction">
          <div className="input-part">
            <CodeEditor
              onChange={onChange}
              theme={theme.value}
              language={language?.value}
              code={code}
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
                  className={activePart === "output" ? "active" : null}
                >
                  Output
                </li>
                <li
                  onClick={() => setActivePart("input")}
                  className={activePart === "input" ? "active" : null}
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
      </div>
    </>
  );
}

export default Home;
