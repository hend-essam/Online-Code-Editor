const UserInput = ({ userInput, setUserInput, activePart }) => {
  return (
    <>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={`write here`}
        className={activePart === "input" ? "active" : "hidden"}
      ></textarea>
    </>
  );
};

export default UserInput;