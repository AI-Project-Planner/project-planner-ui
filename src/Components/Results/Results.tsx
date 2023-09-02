import { useState, useEffect} from 'react';
import './Results.css';
import { postNewForm, apiCall, getColorPalette } from '../../apiCalls';
import { Project } from '../../Types/types';
import Loader from '../Loader/Loader';
import { Link, useLocation } from 'react-router-dom';
import arrow from '../../images/arrow.png'
import add from '../../images/add.png'
import regenerate from '../../images/regenerate.png'
import deleteBtn from '../../images/delete.png'
import loadingSpinner from '../../images/loadingSpinner.gif'
import Timeline from './Timeline/Timeline';
import idea from '../../images/idea.png'
import { FormData } from '../../Types/FormPageTypes';
import React from 'react';
import { createHexCode } from '../../helpers';

interface ResultsProps {
  allProjects?: Project[]
  currentResult: Project
  updateCurrentResult?: (result: Project) => void
  requestAllProjects: () => void
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
  formData?: FormData | null
  onSavedPage?: boolean
}

const Results = ({onSavedPage, currentResult, allProjects, formData, updateCurrentResult, requestAllProjects, setAppError}: ResultsProps) => {
  const splitDataString = (data:string) => {
    return data.split('\n')
  }
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [projectToSave, setProjectToSave] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loadingPalette, setLoadingPalette] = useState(false)
  const [editedPalette, setEditedPalette] = useState(splitDataString(currentResult.attributes.colors))
  const [editedTitle, setEditedTitle] = useState(currentResult.attributes.name)
  const [editedFeatures, setEditedFeatures] = useState(splitDataString(currentResult.attributes.features))
  const [editedInteractions, setEditedInteractions] = useState(splitDataString(currentResult.attributes.interactions))
  const [featInput, setFeatInput] = useState('');
  const [interactionInput, setInteractionInput] = useState('');
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

  const deleteFeature = (feature: string) => {
    setEditedFeatures(prev => prev.filter(feat => feat !== feature))
  }

  const features =  editedFeatures.map(feature => {
    return (
      <div className='feat-interaction-container underlined' key={feature}>
        <p className='feature'>&#x2022;{feature}</p>
        {isEditing && <button onClick={() => deleteFeature(feature)}><img className='editing-add-button' src={deleteBtn}  alt='delete button'/></button>}
      </div>
    )
  })

  const deleteInteraction = (interaction: string) => {
    setEditedInteractions(prev => prev.filter(inter => inter !== interaction))
  }

  const interactions = editedInteractions.map(interaction => {
    return (
      <div className='feat-interaction-container' key={interaction} >
        <p className='feature'>&#x2022;{interaction}</p>
        {isEditing && <button onClick={() => deleteInteraction(interaction)}><img className='editing-add-button' src={deleteBtn}  alt='delete button'/></button>}
      </div>
    )
  })

  const hexCodes = editedPalette.map(color => {
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

  const handleEditClick = () => {
    if (isEditing) {
      //put request here
      const putData = {
        name: editedTitle,
        features: editedFeatures, 
        interactions: editedInteractions
      }
      console.log('put request', putData)
    }
    setIsEditing(prev => !prev)
  }

  const addFeature = (feature: string) =>  {
    setEditedFeatures(prev => [feature, ...prev])
    setFeatInput('')
  }

  const addInteraction = (interaction: string) => {
    setEditedInteractions(prev => [interaction, ...prev])
    setInteractionInput('')
  }

  const regenerateColors = async () => {
    setLoadingPalette(true)
    try {
      const newColors = await getColorPalette(createHexCode())
      setEditedPalette(newColors.colors.map(color => color.hex.value))
      setLoadingPalette(false)
    } catch (error) {
      if(error instanceof Error) setAppError(error)
      setLoadingPalette(false)
    }
  }

  return (<>
    {loading ? <Loader /> :
      <section className='results-page'>
        <h1 className='project-title'>Your Project: {isEditing ? <input className='proj-title-input' type='text' value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /> : <span className='project-title-name'>{editedTitle}</span>}</h1>
        <div className='summary-collab-container'>
          <div className='collab-buttons'>
            <div className='collab'>
              <h2>Collaborators: {currentResult.attributes.collaborators}</h2>
            </div>
              {saveLoading ? <div className='save-create-div' ><img src={loadingSpinner} alt='loading spinner' /></div>: <button className='save-create-button saving-button' onClick={() => handleSave(currentResult)} >{currentResult.attributes.saved ? 'Unsave' : 'Save'} Plan</button>}
              <button onClick={handleEditClick} className='save-create-button'>{isEditing ? 'Save Changes' : 'Edit Plan'}</button>
              {onSavedPage && <Link className='save-create-button save-create-link' to='/saved'><img src={arrow} alt='return to saved projets button' />Return to Saved</Link>}
              {location === '/results' && <button className='save-create-button' onClick={createNewProject}>Create Another</button>}
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
              <h2 style={{ paddingLeft: '20px' }}>Color Palette</h2>
              {isEditing && <button onClick={regenerateColors}><img src={regenerate} alt='regenerate color palette button' /></button>}
          </div>
          <div className='palette-container'>
              {loadingPalette ? <img className='loadingSpinner' src={loadingSpinner}  alt='loading spinner'/> : hexCodes}
          </div>
        </div>
        <div className='features'>
          <div className='feat-inter-header'>
              <h3 className={isEditing ? 'editing-header' : ''}>Features</h3>
              {isEditing &&
                <form className='results-editing-form' onSubmit={(e) => e.preventDefault()}>
                  <input type='text' placeholder='add a feature' value={featInput} onChange={(e) => setFeatInput(e.target.value)} />
                  <button onClick={() => addFeature(featInput)}><img className='editing-add-button' src={add}  alt='add button'/></button>
                </form>
              }
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
              <h3 className={isEditing ? 'editing-header' : ''}>Example Interaction</h3>
              {isEditing &&
                <form className='results-editing-form' onSubmit={(e) => e.preventDefault()}>
                  <input type='text' placeholder='add an interaction' value={interactionInput} onChange={(e) => setInteractionInput(e.target.value)} />
                    <button onClick={() => addInteraction(interactionInput)}><img className='editing-add-button' src={add}  alt='add button'/></button>
                </form>
              } 
          </div>
          <div className='feat-inter-text'>
            {interactions}
          </div>
        </div>
        </div>
        {/* <Timeline steps={splitDataString(currentResult.attributes.steps)} timeframe={currentResult.attributes.timeline} timeframeAmt={currentResult.attributes.timeline_int} /> */}
      </section>
    }
  </>)
}

export default Results