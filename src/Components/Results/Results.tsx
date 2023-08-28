import './Results.css';

interface ResultsProps {
  obj: any
}

const Results = ({obj}: ResultsProps) => {
  const splitDataString = (data:string) => {
    return data.split('\n')
  }
  const features =  splitDataString(obj.attributes.features).map(feature => {
    return (<p className='feature'>&#x2022;{feature}</p>)
  })

  const interactions = splitDataString(obj.attributes.interactions).map(interaction => {
    return (<p className='feature'>&#x2022;{interaction}</p>)
  })

  const hexCodes = splitDataString(obj.attributes.colors).map(color => {
    return (
      <div className='color' style={{backgroundColor: `${color}`}}>
        <p className='hex-code'>{color}</p>
      </div>)})


  return (
    <section className='results-page'>
      <h1>Your Project: {obj.attributes.name}</h1>
      <div className='summary-collab-container'>
        <div className='summary'>
          <div className='summary-header'>
            <h2>Summary</h2>
          </div>
          <div className='summary-text-container'>
            <p className='summary-text'>{obj.attributes.description}</p>
          </div>
        </div>
        <div className='collab-buttons'>
          <div className='collab'>
            <h2>Collaborators: </h2>
          </div>
          <button className='save-create-button'>Save Plan</button>
          <button className='save-create-button'>Create Another</button>
        </div>
      </div>
      <div className='design-features-container'>
        <div className='design'>
          <div className='palette-header'>
            <h2>Color Palette</h2>
          </div>
          <div className='palette-container'>
            {hexCodes}
          </div>
        </div>
        <div className='features'>
          <div className='feat-inter-header'>
            <h3>Features</h3>
          </div>
          <div className='feat-inter-text'>
            {features}
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
            {interactions}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Results