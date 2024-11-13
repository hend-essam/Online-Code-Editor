import Editor from "@monaco-editor/react";
import React, { useState, useEffect } from "react";

const CodeEditor = ({ onChange, language, theme, example, handleEditing}) => {
const [initialCode, setInitialCode] = useState(example);
   const handleEditorChange = (value) => {
    onChange("code", value);
    handleEditing(value !== initialCode);
  };

  useEffect(() => {
    setInitialCode(example);
  }, [example]);
  
  return (
      <Editor
        className="editor"
        width={`100%`}
        language={language}
        value={example}
        theme={theme}
        defaultValue="// start coding"
        onChange={handleEditorChange}
        options={{
          scrollBeyondLastLine:false,
          fontSize:"16px"
      }}
      />
  );
};
export default CodeEditor;
  