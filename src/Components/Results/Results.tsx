import { useState, useEffect} from 'react';
import './Results.css';
import { postNewForm, apiCall, postLogo } from '../../apiCalls';
import { TechVideoLinks } from '../../Types/types';
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
import logosBlur from '../../images/blur-logos.jpg';
import { logoImages, fonts } from '../../images/logos/logodata';
import logoContainer from '../../images/logos/logo-container.png';

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
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [projectToSave, setProjectToSave] = useState<Project | null>(null);
  const [logoImage, setLogoImage] = useState(currentResult.attributes.logo_url);
  const [logoFont, setLogoFont] = useState(currentResult.attributes.logo_font);
  const location = useLocation().pathname;
  const imports = [a, a2, b, b2, c, c2, d, d2, e, e2, f, f2, g, g2, h, h2, i, i2, j, j2, k, k2, l, l2, m, m2, n, n2, o, o2, p, p2, q, q2, r, r2, s, s2, t, t2, u, u2, v, v2, w, w2, x, x2, y, y2, z, z2]

  const getRandomIndex = (array: string[]) => {
    return Math.floor(Math.random() * array.length)
  }

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

  const generateLogo = () => {
    setLogoImage(imports[getRandomIndex(imports)]);
    setLogoFont(fonts[getRandomIndex(fonts)]);
    // setLoading(true);

    
    // const postInfo = {
    //   tagline: currentResult.attributes.tagline,
    //   name: currentResult.attributes.name,
    // }
    // try {
    //   postLogo(postInfo, currentResult.id).then(data => {
    //     setLoading(false);
    //     if (updateCurrentResult) updateCurrentResult(data.data)
    //   })
    // } catch (error) {
    //   console.log(error)
    //   if (error instanceof Error) {
    //     setAppError(error)
    //     setLoading(false)
    //   }
    // }

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
              {saveLoading ? <div className='save-create-div' ><img src={loadingSpinner} alt='loading spinner' /></div>: <button className='save-create-button saving-button' onClick={() => handleSave(currentResult)} >{currentResult.attributes.saved ? 'Unfavorite Plan' : 'Add to Favorites'}</button>}
              {onSavedPage && <Link className='save-create-button save-create-link' to='/saved'><img src={arrow} alt='return to saved projets button' />Return to Favorites</Link>}
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
        <div className='custom-logo-container'>
          <div className='custom-logo-box'>
          <div className='design-header-container'>
            <div className='design-header-background'>
              <h2 className='design-header'>Exclusive Feature</h2>
            </div>
          </div>
            <div className='palette-header '>
              <h3 style={{paddingLeft: '20px'}}>Logo</h3>
            </div>
            {loading ?  <p>...loading </p> :
              logoImage.length?
                <div className='project-logo'>
                  <img className='logo-img-container' src={logoContainer} alt='decorative logo container' /> 
                  <img src={logoImage} className='logo-image' alt='generated logo for project' />
                  <p style={{fontFamily: logoFont}}>{currentResult.attributes.name}</p>
              </div>
              :
              <>
              <img src={logosBlur} alt='blurred logos background' className='logo-background' />
              <div className='logo-text-box'>
                <p className='logo-text'>Want a custom AI generated logo?</p>
                <button className='logo-button' onClick={generateLogo}>Generate logo</button>
              </div>
              </>
            }
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
  </>
  )
}

export default Results