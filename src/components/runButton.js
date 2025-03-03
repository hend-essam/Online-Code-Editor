import useKeyPress from "./hooks/useKeyPress";
import { useEffect } from "react";

function RunBtn({ handleCompile, code, processing }) {
  const compileBtn = useKeyPress("F9");

  useEffect(() => {
    if (compileBtn) {
      console.log("F9 pressed, compiling...");
      handleCompile();
    }
  }, [compileBtn, handleCompile]);

  return (
    <button
      className="run-btn"
      onClick={handleCompile}
      disabled={!code || processing}
    >
      {processing ? "Processing..." : "Run (F9)"}
    </button>
  );
}

export default RunBtn;
