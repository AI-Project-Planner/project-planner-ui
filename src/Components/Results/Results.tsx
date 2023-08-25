import './Results.css';

const Results = () => {

  return (
    <section className='results-page'>
      <h1>Your Project: </h1>
      <div className='summary-collab-container'>
        <div className='summary'>
          <div className='summary-header'>
            <h2>Summary</h2>
          </div>
          <div className='summary-text'>
            <p>summary txt here</p>
          </div>
        </div>
        <div className='collab-buttons'>
          <div className='collab'>
            <h2>Collaborators: </h2>
          </div>
          <button>Save Plan</button>
          <button>Create Another</button>
        </div>
      </div>
      <div className='design-features-container'>
        <div className='design'>
          <div className='palette-header'>
            <h2>Color Palette</h2>
          </div>
          <div className='palette-container'>
            <div className='color'>
              <p className='hex-code'>hex code</p>
            </div>
            <div className='color'>
              <p className='hex-code'>hex code</p>
            </div>
            <div className='color'>
              <p className='hex-code'>hex code</p>
            </div>
            <div className='color'>
              <p className='hex-code'>hex code</p>
            </div>
            <div className='color'>
              <p className='hex-code'>hex code</p>
            </div>
            <div className='color'>
              <p className='hex-code'>hex code</p>
            </div>
          </div>
        </div>
        <div className='features'>
          <div className='feat-inter-header'>
            <h3>Features</h3>
          </div>
          <div className='feat-inter-text'>
            <p>List of features here</p>
          </div>
        </div>
      </div>
      <div className='video-interaction-container'>
        <div className='video'>
          <h3>YouTube Video will go here</h3>
          <p>thumbnail for video</p>
        </div>
        <div className='interaction'>
          <div className='feat-inter-header'>
            <h3>Example Interaction</h3>
          </div>
          <div className='feat-inter-text'>
            <p>List of features here</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Results