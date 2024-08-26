import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, language, theme, code }) => {
  const handleEditorChange = (value) => {
    onChange("code", value);
  };

  return (
    <Editor
      className="editor"
      width={`100%`}
      language={language}
      value={code}
      theme={theme}
      defaultValue="// start coding"
      onChange={handleEditorChange}
      options={{
        scrollBeyondLastLine: false,
        fontSize: "16px",
      }}
    />
  );
};
export default CodeEditor;
