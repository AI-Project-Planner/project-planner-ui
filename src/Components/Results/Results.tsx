import { useState, useEffect} from 'react';
import './Results.css';
import { TechVideoLinks, Project } from '../../Types/types';
import { postNewForm, apiCall, getColorPalette, putProject, deleteProject, addLogo} from '../../apiCalls';
import Loader from '../Loader/Loader';
import DemoCarousel from './DemoCarousel';
import { Link, useLocation } from 'react-router-dom';
import arrow from '../../images/arrow.png'
import add from '../../images/add.png'
import regenerate from '../../images/regenerate.png'
import deleteBtn from '../../images/delete.png'
import loadingSpinner from '../../images/loadingSpinner.gif'
import idea from '../../images/idea.png'
import { FormData } from '../../Types/FormPageTypes';
import React from 'react';
import { putData as putDataType } from '../../Types/types';
import { createHexCode } from '../../helpers';
import close from '../../images/close.png'
import logosBlur from '../../images/blur-logos.jpg';
import { fonts, logoURLs } from '../../data/data';
import logoContainer from '../../images/logos/logo-container.png';
import { techVideoLinks } from '../../data/data';
import Timelines from '../Timelines/Timelines';

interface ResultsProps {
  currentResult: Project
  updateCurrentResult?: (result: Project) => void
  requestAllProjects: () => void
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
  formData?: FormData | null
  onSavedPage?: boolean,
  getAllProjects: () => Promise<Project[]>
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>
}




const Results = ({onSavedPage, currentResult, setAllProjects, getAllProjects, formData, updateCurrentResult, requestAllProjects, setAppError}: ResultsProps) => {
  const splitDataString = (data: string) => {
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
  const [logoImage, setLogoImage] = useState(currentResult.attributes.logo_url);
  const [logoFont, setLogoFont] = useState(currentResult.attributes.logo_font);

  const location = useLocation().pathname;

  const getRandomIndex = (array: string[]) => {
    return Math.floor(Math.random() * array.length)
  }

  useEffect(() => {
    if (projectToSave) {
      const patchSaved: () => Promise<Project> = apiCall(projectToSave.attributes.user_id, `projects/${projectToSave.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ saved: projectToSave.attributes.saved }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const callAPI = async () => {
        setSaveLoading(true)
        try {
          const newProject = await patchSaved()
          if(updateCurrentResult) updateCurrentResult(newProject)
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

  const features = editedFeatures.map(feature => {
    return (
      <div className='feat-interaction-container underlined' key={feature}>
        <p className='feature'>&#x2022;{feature}</p>
        {isEditing && <button onClick={() => deleteFeature(feature)}><img className='delete-btn editing-add-button' src={deleteBtn} alt='delete button' /></button>}
      </div>
    )
  })
  

  const videos = currentResult.attributes.technologies.split(', ').map(tech => {
    return (
      <div className='individual-video' key={techVideoLinks[tech]}>
        <iframe src={techVideoLinks[tech]} allowFullScreen title="Embedded youtube trailer" />
      </div>)
  })


  const deleteInteraction = (interaction: string) => {
    setEditedInteractions(prev => prev.filter(inter => inter !== interaction))
  }

  const interactions = editedInteractions.map(interaction => {
    return (
      <div className='feat-interaction-container' key={interaction} >
        <p className='feature'>&#x2022;{interaction}</p>
        {isEditing && <button onClick={() => deleteInteraction(interaction)}><img className='editing-add-button' src={deleteBtn} alt='delete button' /></button>}
      </div>
    )
  })

  const hexCodes = editedPalette.map(color => {
    return (
      <div key={color} className='color' style={{ backgroundColor: `${color}` }}>
        <p className='hex-code'>{color}</p>
      </div>)
  })

  const createNewProject = async () => {
    if (formData) {
      setLoading(true)
      try {
        const newResult = await postNewForm(formData)
        if (updateCurrentResult) updateCurrentResult(newResult.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        if (error instanceof Error) {
          setAppError(error)
          setLoading(false)
        }
      }
    }
  }

  const handleSave = (project: Project | null) => {
    if (project) {
      const newProject = JSON.parse(JSON.stringify(project))
      newProject.attributes.saved = !newProject.attributes.saved
      setProjectToSave(newProject)
    }
  }



  const handleEditClick = async() => {
    if (isEditing) {
      const putData: putDataType = JSON.parse(JSON.stringify(currentResult))
      putData.attributes.name = editedTitle;
      putData.attributes.features = editedFeatures.join('\n');
      putData.attributes.interactions = editedInteractions.join('\n');
      putData.attributes.colors = editedPalette.join('\n');
      putData.attributes.logo_url = logoImage;
      putData.attributes.logo_font = logoFont
     
      try {
        await putProject(putData, currentResult.id)
      } catch (error) {
        if (error instanceof Error) setAppError(error)
      }
    }
    setIsEditing(prev => !prev)
  }

  const addFeature = (feature: string) => {
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
      if (error instanceof Error) setAppError(error)
      setLoadingPalette(false)
    }
  }

  
  const handleDelete = (project: Project) => {
    try {
      deleteProject(project)
    } catch (error) {
      if (error instanceof Error) setAppError(error)
    }
  }

  const generateLogo = () => {
    setLogoImage(logoURLs[getRandomIndex(logoURLs)]);
    setLogoFont(fonts[getRandomIndex(fonts)]);
  }

  useEffect(()=> {
    const updatedAttributes = {
      ...currentResult.attributes,
      logo_url: logoImage,
      logo_font: logoFont
    }
    if(updatedAttributes.logo_url.length) {
      addLogo(updatedAttributes, currentResult.id)
      console.log(updatedAttributes)
    }
  },[logoImage])

  return (<>
    {loading ? <Loader /> :
      <section className='results-page'>
        <h1 className='project-title'>Your Project: {isEditing ? <input className='proj-title-input' type='text' value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /> : <span className='project-title-name'>{editedTitle}</span>}</h1>
        <div className='summary-collab-container'>
          <div className='collab-buttons'>
            <div className='collab'>
              <h2>Collaborators: {currentResult.attributes.collaborators}</h2>
            </div>

            {saveLoading ? <div className='save-create-div' ><img src={loadingSpinner} alt='loading spinner' /></div> : <button className='save-create-button saving-button' onClick={() => handleSave(currentResult)} >{currentResult.attributes.saved ? 'Unfavorite' : 'Favorite'} Plan</button>}
            <button onClick={handleEditClick} className='save-create-button'>{isEditing ? 'Save Changes' : 'Edit Plan'}</button>
            {onSavedPage && <Link className='save-create-button save-create-link' to='/saved'><img src={arrow} alt='return to saved projets button' />Return to Favorites</Link>}
            {location === '/results' && <button className='save-create-button' onClick={createNewProject}>Create Another</button>}
            {location.includes('/history') && <Link className='save-create-button save-create-link' to='/history' onClick={() => handleDelete(currentResult)}><img src={close} alt='delete project button' />Delete From History</Link>}
            { location.includes('/history') && <Link className='save-create-button save-create-link' to='/history'><img src={arrow} alt='return to all projets button' />Return to History</Link> }
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
        <Timelines steps={splitDataString(currentResult.attributes.steps)}/>
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
              {loadingPalette ? <img className='loadingSpinner' src={loadingSpinner} alt='loading spinner' /> : hexCodes}
            </div>
          </div>
          <div className='features'>
            <div className='feat-inter-header'>
              <h3 className={isEditing ? 'editing-header' : ''}>Features</h3>
              {isEditing &&
                <form className='results-editing-form' onSubmit={(e) => e.preventDefault()}>
                  <input type='text' placeholder='add a feature' value={featInput} onChange={(e) => setFeatInput(e.target.value)} />
                  <button onClick={() => addFeature(featInput)}><img className='editing-add-button' src={add} alt='add button' /></button>
                </form>
              }
            </div>
            <div className='feat-inter-text'>
              {features}
            </div>
          </div>
        </div>
        <div className='custom-logo-container'>
          <div className='custom-logo-box'>
            <div className='design-header-container'>
              <div className='design-header-background'>
                <h2 className='design-header'>Exclusive Feature</h2>
              </div>
            </div>
            <div className='palette-header '>
              <h2 style={{ paddingLeft: '20px' }}>Logo</h2>
              {isEditing && logoImage !== '' && <button onClick={generateLogo}><img src={regenerate} alt='regenerate logo button' /></button>}
            </div>
            {loading ? <p>...loading </p> :
              logoImage.length ?
                <div className='project-logo'>
                  <img className='logo-img-container' src={logoContainer} alt='decorative logo container' />
                  <img src={logoImage} className='logo-image' alt='generated logo for project' />
                  <p style={{textShadow: `0px 2px 5px ${splitDataString(currentResult.attributes.colors)[getRandomIndex(splitDataString(currentResult.attributes.colors))]}`, fontFamily: logoFont}}>{currentResult.attributes.name}</p>
              </div>
              :
              <>
              <img src={logosBlur} alt='blurred logos background' className='logo-background' />
              <div className='logo-text-box'>
                <p className='logo-text'>Want a custom generated logo?</p>
                <button className='logo-button' onClick={generateLogo}>Generate logo</button>
              </div>
              </>
            }
          </div>
          <div className='interaction'>
            <div className='feat-inter-header'>
              <h3 className={isEditing ? 'editing-header' : ''}>Example Interaction</h3>
              {isEditing &&
                <form className='results-editing-form' onSubmit={(e) => e.preventDefault()}>
                  <input type='text' placeholder='add an interaction' value={interactionInput} onChange={(e) => setInteractionInput(e.target.value)} />
                  <button onClick={() => addInteraction(interactionInput)}><img className='editing-add-button' src={add} alt='add button' /></button>
                </form>
              }
            </div>
            <div className='feat-inter-text'>
              {interactions}
            </div>
          </div>
        </div>
        <DemoCarousel videos={videos} />
      </section>}
  </>
  )
}


export default Results