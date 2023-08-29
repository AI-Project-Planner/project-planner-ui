import { useState, useEffect} from 'react';
import './Results.css';
import { postNewForm, PostInfo, apiCall } from '../../apiCalls';
import { Project } from '../../Types/types';
import Loader from '../Loader/Loader';
import { Link, useLocation, useParams } from 'react-router-dom';
import arrow from '../../images/arrow.png'

interface ResultsProps {
  allProjects?: Project[]
  currentResult: Project | null 
  updateCurrentResult?: (result: Project) => void
  requestAllProjects: () => void
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
  formData?: PostInfo | null
}

const Results = ({currentResult, allProjects, formData, updateCurrentResult, requestAllProjects, setAppError}: ResultsProps) => {
  const [loading, setLoading] = useState(false)
  const [projectToDisplay, setProjectToDisplay] = useState(currentResult)
  const [badRoute, setBadRoute] = useState(false)
  const location = useLocation().pathname
  const { projectID } = useParams()
  
  useEffect(() => {
    if (location.includes('saved')) {
      const projectInParams = allProjects?.find(project => project.id === projectID)  
      if (projectInParams) {
        setProjectToDisplay(projectInParams)
      } else {
        setBadRoute(true)
      }
    }
   }, [])


  if (badRoute) {
    return (
      <div>Oops! We couldn't find the page you are looking for</div>
    )
  }

  if (!projectToDisplay) {
    
    return (<div>no results</div>)
  }

  const splitDataString = (data:string) => {
    return data.split('\n')
  }
  const features =  splitDataString(projectToDisplay.attributes.features).map(feature => {
    return (<p className='feature'>&#x2022;{feature}</p>)
  })

  const interactions = splitDataString(projectToDisplay.attributes.interactions).map(interaction => {
    return (<p className='feature'>&#x2022;{interaction}</p>)
  })

  const hexCodes = splitDataString(projectToDisplay.attributes.colors).map(color => {
    return (
      <div className='color' style={{backgroundColor: `${color}`}}>
        <p className='hex-code'>{color}</p>
      </div>)})

  const createNewProject = async() => {
    if (formData) {
      setLoading(true)
      try {
        const newResult = await postNewForm(formData)
        if (updateCurrentResult) updateCurrentResult(newResult)
        setLoading(false)
      } catch(error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  const handleSave = async (project: Project | null) => {
    if (project) {
      const newProject = { ...project }
      newProject.attributes.saved = !newProject.attributes.saved
      const patchSaved = apiCall(project.attributes.user_id, `projects/${project.id}`, {
        method: 'PATCH', 
        body: JSON.stringify(newProject),
        headers: {
          "Content-Type": "application/json"
        }
      })
      try {
        try {
          patchSaved()
          requestAllProjects()
        } catch (error) {
          if (error instanceof Error) setAppError(error)
        }
      } catch (error) {
        
      }
    }
  }

  return (<>
    {loading ? <Loader /> :
    <section className='results-page'>
      <h1 style={{fontSize: '25px'}}>Your Project: {projectToDisplay.attributes.name}</h1>
      <div className='summary-collab-container'>
        <div className='summary'>
          <div className='summary-header'>
            <h2>Summary</h2>
          </div>
          <div className='summary-text-container'>
            <p className='summary-text'>{projectToDisplay.attributes.description}</p>
          </div>
        </div>
        <div className='collab-buttons'>
          <div className='collab'>
            <h2>Collaborators: {projectToDisplay.attributes.collaborators}</h2>
          </div>
            <button className='save-create-button' onClick={() => handleSave(currentResult)}>{projectToDisplay.attributes.saved ? 'Unsave' : 'Save'} Plan</button>
            {location.includes('saved')
              ? <Link className='save-create-button save-create-link' to='/saved'><img src={arrow} alt='return to saved projets button' />Return to Saved</Link>
              : <button className='save-create-button' onClick={createNewProject}>Create Another</button>}
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
    </section>}
  </>)
}

export default Results