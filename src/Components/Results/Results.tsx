import { useState } from 'react';
import './Results.css';
import { PostData, TechVideoLinks } from '../../Types/ResultsTypes';
import { postNewForm, PostInfo } from '../../apiCalls';
import Loader from '../Loader/Loader';

interface ResultsProps {
  currentResult: PostData | null
  updateCurrentResult: (result: PostData) => void
  formData: PostInfo | null
}

const Results = ({currentResult, formData, updateCurrentResult}: ResultsProps) => {
  const [loading, setLoading] = useState(false)
  if (!currentResult) {
    return (<div>no results</div>)
  }

  const techVideoLinks: TechVideoLinks = {
    'react': 'https://www.youtube.com/embed/Rh3tobg7hEo?si=oV2L4nXo1uezzkuj',
    'typescript': 'https://www.youtube.com/embed/BCg4U1FzODs?si=ja2o-7smlLJhpwBw',
    'javascript': 'https://www.youtube.com/embed/PkZNo7MFNFg?si=2TQ_gCU97qCntsJo',
    'vue': 'https://www.youtube.com/embed/qZXt1Aom3Cs?si=-RnxLRaaHhwCes2S',
    'angular': 'https://www.youtube.com/embed/k5E2AVpwsko?si=dwkbm16HjsBxjNyb',
    'ruby/rails': 'https://www.youtube.com/embed/fmyvWz5TUWg?si=KiOc18KdsQaiBe9V',
    'postgresql': 'https://www.youtube.com/embed/zw4s3Ey8ayo?si=-O_3SibqwOFagLQO',
    'node': 'https://www.youtube.com/embed/TlB_eWDSMt4?si=im0pUXj67QsSqpDC',
    'sidekiq': 'https://www.youtube.com/embed/fUVTtTVJ_QY?si=O4H0Laru4fqHzyp-',
    'devise': 'https://www.youtube.com/embed/9K5YvsrKBRk?si=TRrgI9eB4X_tqNEi'
  }

  const videos = formData?.technologies.map(tech => {
    return (
    <div>
      <iframe src={techVideoLinks[tech]} allowFullScreen title="Embedded youtube trailer"/> 
    </div>)
  })

  const splitDataString = (data:string) => {
    return data.split('\n')
  }
  const features =  splitDataString(currentResult.attributes.features).map(feature => {
    return (<p className='feature'>&#x2022;{feature}</p>)
  })

  const interactions = splitDataString(currentResult.attributes.interactions).map(interaction => {
    return (<p className='feature'>&#x2022;{interaction}</p>)
  })

  const hexCodes = splitDataString(currentResult.attributes.colors).map(color => {
    return (
      <div className='color' style={{backgroundColor: `${color}`}}>
        <p className='hex-code'>{color}</p>
      </div>)})

  const createNewProject = async() => {
    if (formData) {
      setLoading(true)
      try {
        const newResult = await postNewForm(formData)
        updateCurrentResult(newResult)
        setLoading(false)
      } catch(error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  return (<>
    {loading ? <Loader /> :
    <section className='results-page'>
      <h1>Your Project: {currentResult.attributes.name}</h1>
      <div className='summary-collab-container'>
        <div className='summary'>
          <div className='summary-header'>
            <h2>Summary</h2>
          </div>
          <div className='summary-text-container'>
            <p className='summary-text'>{currentResult.attributes.description}</p>
          </div>
        </div>
        <div className='collab-buttons'>
          <div className='collab'>
            <h2>Collaborators: {currentResult.attributes.collaborators}</h2>
          </div>
          <button className='save-create-button'>Save Plan</button>
          <button className='save-create-button' onClick={createNewProject}>Create Another</button>
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
          <h3>Videos Based On Your Technologies</h3>
          {videos}
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
    </section>}
  </>)
}

export default Results