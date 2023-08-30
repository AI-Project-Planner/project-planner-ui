import { useState, useEffect} from 'react';
import './Results.css';
import { postNewForm, PostInfo, apiCall } from '../../apiCalls';
import { Project } from '../../Types/types';
import Loader from '../Loader/Loader';
import { Link, useLocation, useParams } from 'react-router-dom';
import arrow from '../../images/arrow.png'
import loadingSpinner from '../../images/loadingSpinner.gif'

interface ResultsProps {
  allProjects?: Project[]
  currentResult: Project
  updateCurrentResult?: (result: Project) => void
  requestAllProjects: () => void
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
  formData?: PostInfo | null
  onSavedPage?: boolean
}

const Results = ({onSavedPage, currentResult, allProjects, formData, updateCurrentResult, requestAllProjects, setAppError}: ResultsProps) => {
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  // const [projectToDisplay, setProjectToDisplay] = useState(currentResult)
  // const [badRoute, setBadRoute] = useState(false)
  const [projectToSave, setProjectToSave] = useState<Project | null>(null)
  // const location = useLocation().pathname
  // const { projectID } = useParams()
  
  // useEffect(() => {
  //   if (location.includes('saved')) {
  //     const projectInParams = allProjects?.find(project => project.id === projectID)  
  //     if (projectInParams) {
  //       setProjectToDisplay(projectInParams)
  //     } else {
  //       setBadRoute(true)
  //     }
  //   }
  // }, [allProjects])
  
  useEffect(() => { 
    if (projectToSave) {
      const patchSaved: () => Promise<Project> = apiCall(projectToSave.attributes.user_id, `projects/${projectToSave.id}`, {
        method: 'PATCH', 
        body: JSON.stringify(projectToSave),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const callAPI = async () => {
        setSaveLoading(true)
        try {
          await patchSaved()
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
  const splitDataString = (data:string) => {
    return data.split('\n')
  }
  const features =  splitDataString(currentResult.attributes.features).map(feature => {
    return (<p key={feature} className='feature'>&#x2022;{feature}</p>)
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
        if (updateCurrentResult) updateCurrentResult(newResult)
        setLoading(false)
      } catch(error) {
        console.log(error)
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

  return (<>
    {loading ? <Loader /> :
    <section className='results-page'>
      <h1 style={{fontSize: '25px'}}>Your Project: {currentResult.attributes.name}</h1>
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
            {saveLoading ? <div className='save-create-div' ><img src={loadingSpinner} alt='loading spinner' /></div>: <button className='save-create-button saving-button' onClick={() => handleSave(currentResult)} >{currentResult.attributes.saved ? 'Unsave' : 'Save'} Plan</button>}
            {onSavedPage
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