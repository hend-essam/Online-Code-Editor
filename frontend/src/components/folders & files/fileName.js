function FileName({
  openFileName,
  setOpenFileName,
  fileName,
  setFile,
  saveCode,
}) {
  const handleInputChange = (e) => {
    setFile(e.target.value);
  };

  return (
    <>
      {openFileName ? (
        <section className="file-name-section">
          <div className="file-name">
            <h1>Enter Your File Name</h1>
            <input
              type="text"
              placeholder="file name"
              value={fileName}
              onChange={handleInputChange}
            />
            <div>
              <button onClick={() => setOpenFileName(false)}>Cancel</button>
              <button onClick={saveCode}>Save</button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export default FileName;
