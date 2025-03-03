import { useState, useEffect, useRef } from "react";

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);
  const isKeyHeld = useRef(false);

  const downHandler = (event) => {
    if (event.code === targetKey || event.keyCode === 170) {
      event.preventDefault();
      if (!isKeyHeld.current) {
        setKeyPressed(true);
        isKeyHeld.current = true;
      }
    }
  };

  const upHandler = (event) => {
    if (event.code === targetKey || event.keyCode === 170) {
      setKeyPressed(false);
      isKeyHeld.current = false;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

export default useKeyPress;
