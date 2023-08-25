import './Results.css';

const Results = () => {

  return (
    <section className='results-page'>
      <h1>Your Project: </h1>
      <div className='summary-collab-container'>
        <div className='summary'>
          <h2>Summary</h2>
          <p>summary txt here</p>
        </div>
        <div className='collab-and-buttons'>
          <h2>Collaborators: </h2>
          <button>Save Plan</button>
          <button>Create Another</button>
        </div>
      </div>
      <div className='design-features-container'>
        <div className='design'>
          <h3>Design</h3>
          <h2>Color Paletter</h2>
          <div className='color-1'>
            <p>hex code</p>
          </div>
          <div className='color-2'>
            <p>hex code</p>
          </div>
          <div className='color-3'>
            <p>hex code</p>
          </div>
          <div className='color-4'>
            <p>hex code</p>
          </div>
          <div className='color-5'>
            <p>hex code</p>
          </div>
          <div className='color-6'>
            <p>hex code</p>
          </div>
        </div>
        <div className='features'>
          <h3>Features</h3>
          <p>List of features here</p>
        </div>
      </div>
      <div className='video-interaction-container'>
        <div className='video'>
          <h3>YouTube Video will go here</h3>
          <p>thumbnail for video</p>
        </div>
        <div className='interaction'>
          <h3>Example Interaction</h3>
          <p>List of features here</p>
        </div>
      </div>
    </section>
  )
}

export default Results