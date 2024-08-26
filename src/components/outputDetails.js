function OutputDetails({outputDetails}){
  return(
  <>
    {outputDetails ? 
    <section className="details">
      <h4 className="status">{outputDetails.status.description}</h4>
      <div className="code-details">
        <div className="heading">
          <h4>Memory</h4>
          <h4>Time</h4>
        </div>
        <div className="value">
          <div>{outputDetails.memory}</div>
          <div>{outputDetails.time}</div>
        </div>
      </div>
    </section>
    : null}
  </>
  )
}

export default OutputDetails;