import Results from "../Results/Results"
import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Project } from "../../Types/types"
import Empty from "../Empty/Empty"
import spinner from '../../images/spinner.gif'
import React from "react"

interface SingleProjectProps {
  allProjects: Project[],
  requestAllProjects: () => void
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
  getAllProjects: () => Promise<Project[]>
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>
}
const SingleProject = ({allProjects, setAllProjects, getAllProjects, requestAllProjects, setAppError}: SingleProjectProps) => {
  const [projectToDisplay, setProjectToDisplay] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation().pathname
  const { projectID } = useParams()
  
  useEffect(() => {
    setLoading(true)
    const projectInParams = allProjects?.find(project => project.id === projectID)  
    if (projectInParams) {
      setProjectToDisplay(projectInParams)
    } 
    setLoading(false)
  
  }, [allProjects, location, projectID])

  if (loading) {
    return <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img style={{ borderRadius: '50%' }} src={spinner}  alt='loading symbol' /></div>
  }

  return projectToDisplay ? <Results setAllProjects={setAllProjects} getAllProjects={getAllProjects} onSavedPage={location.includes('saved')} currentResult={projectToDisplay} allProjects={allProjects} requestAllProjects={requestAllProjects} setAppError={setAppError} /> : <Empty />
}

export default SingleProject