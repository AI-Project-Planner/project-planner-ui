import { useState, useEffect} from 'react';
import './Results.css';
import { TechVideoLinks } from '../../Types/types';
import { postNewForm, apiCall, deleteProject } from '../../apiCalls';
import { Project } from '../../Types/types';
import Loader from '../Loader/Loader';
import DemoCarousel from './DemoCarousel';
import { Link, useLocation } from 'react-router-dom';
import arrow from '../../images/arrow.png'
import loadingSpinner from '../../images/loadingSpinner.gif'
import Timeline from './Timeline/Timeline';
import idea from '../../images/idea.png'
import { FormData } from '../../Types/FormPageTypes';
import React from 'react';
import close from '../../images/close.png'

interface ResultsProps {
  allProjects?: Project[]
  currentResult: Project
  updateCurrentResult?: (result: Project) => void
  requestAllProjects: () => void
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
  formData?: FormData | null
  onSavedPage?: boolean,
  getAllProjects: () => Promise<Project[]>
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>
}

const Results = ({onSavedPage, currentResult, setAllProjects, allProjects, getAllProjects, formData, updateCurrentResult, requestAllProjects, setAppError}: ResultsProps) => {
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [projectToSave, setProjectToSave] = useState<Project | null>(null)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const location = useLocation().pathname;
  
  useEffect(() => { 
    if (projectToSave) {
      const patchSaved: () => Promise<Project> = apiCall(projectToSave.attributes.user_id, `projects/${projectToSave.id}`, {
        method: 'PATCH', 
        body: JSON.stringify({saved: projectToSave.attributes.saved}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const callAPI = async () => {
        setSaveLoading(true)
        try {
          const newProject = await patchSaved()
          console.log(newProject)
          requestAllProjects()
          setSaveLoading(false)
        } catch (error) {
          if (error instanceof Error) setAppError(error)
          setSaveLoading(false)
        } 
      }
      callAPI()
    }
    return () => setAppError(null)
  }, [projectToSave])

  useEffect(() => {
    if (projectToDelete) {
      setLoading(true)
      requestAllProjects()
      setLoading(false)
    }
 
  }, [projectToDelete])
    
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

  const splitDataString = (data:string) => {
    return data.split('\n')
  }

  const videos = currentResult.attributes.technologies.split(', ').map(tech => {
    return (
    <div className='individual-video' key={techVideoLinks[tech]}>
      <iframe src={techVideoLinks[tech]} allowFullScreen title="Embedded youtube trailer"/> 
    </div>)
  })

  const features =  splitDataString(currentResult.attributes.features).map(feature => {
    return (<p key={feature} className='feature underlined'>&#x2022;{feature}</p>)
  })

  const interactions = splitDataString(currentResult.attributes.interactions).map(interaction => {
    return (<p key={interaction} className='feature'>&#x2022;{interaction}</p>)
  })

  const hexCodes = splitDataString(currentResult.attributes.colors).map(color => {
    return (
      <div key={color} className='color' style={{backgroundColor: `${color}`}}>
        <p className='hex-code'>{color}</p>
      </div>)})

  const createNewProject = async() => {
    if (formData) {
      setLoading(true)
      try {
        const newResult = await postNewForm(formData)
        if (updateCurrentResult) updateCurrentResult(newResult.data)
        setLoading(false)
      } catch(error) {
        console.log(error)
        if (error instanceof Error) setAppError(error)
        setLoading(false)
      }
    }
  }

  const handleSave = (project: Project | null) => {
    console.log('clicked')
    if (project) {
    console.log('clicked in if')

      const newProject = JSON.parse(JSON.stringify(project))
      newProject.attributes.saved = !newProject.attributes.saved
      setProjectToSave(newProject)
    }
  }

  const handleDelete = (project: Project) => {
    setProjectToDelete(project)
    try {
      deleteProject(project).then(() => {
        getAllProjects().then(data => {
          console.log('here', data)
          setAllProjects(data)
        })
      })
      setProjectToDelete(null)
    } catch (error) {
      if (error instanceof Error) setAppError(error)
    }
  }

  return (<>
    {loading ? <Loader /> :
    <section className='results-page'>
      <h1 className='project-title'>Your Project: <span className='project-title-name'>{currentResult.attributes.name}</span></h1>
        <div className='summary-collab-container'>
          <div className='collab-buttons'>
            <div className='collab'>
              <h2>Collaborators: {currentResult.attributes.collaborators}</h2>
            </div>
              {saveLoading ? <div className='save-create-div' ><img src={loadingSpinner} alt='loading spinner' /></div>: <button className='save-create-button saving-button' onClick={() => handleSave(currentResult)} >{currentResult.attributes.saved ? 'Unsave' : 'Save'} Plan</button>}
              {onSavedPage && <Link className='save-create-button save-create-link' to='/saved'><img src={arrow} alt='return to saved projets button' />Return to Saved</Link>}
              {location === '/results' && <button className='save-create-button' onClick={createNewProject}>Create Another</button>}
              {location.includes('/history') && <Link className='save-create-button save-create-link' to='/history' onClick={() => handleDelete(currentResult)}><img src={close} alt='delete project button' />Delete From History</Link>}
              {location.includes('/history') && <Link className='save-create-button save-create-link' to='/history'><img src={arrow} alt='return to all projets button' />Return to History</Link>}
          </div>
          <div className='summary'>
            <div className='summary-header'>
              <h2>Summary</h2>
            </div>
            <div className='summary-text-container'>
              <div className='summary-text-wrapper'>
                <p className='summary-text'>{currentResult.attributes.description}</p>
              </div>
            </div>
            <img className='results-sticker' src={idea} alt='hands holding up a lightbulb' />
          </div>

        </div>
        <Timeline steps={splitDataString(currentResult.attributes.steps)} timeframe={currentResult.attributes.timeline} timeframeAmt={currentResult.attributes.timeline_int} />
      <div className='design-features-container'>
        <div className='design'>
          <div className='design-header-container'>
            <div className='design-header-background'>
              <h2 className='design-header'>Design</h2>
            </div>
          </div>
          <div className='palette-header'>
            <h2 style={{paddingLeft: '20px'}}>Color Palette</h2>
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
          <h3>Logos will go here</h3>
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
      <DemoCarousel videos={videos} />
    </section>}
  </>)
}

export default Results