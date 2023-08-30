import Results from "../Results/Results"
import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Project } from "../../Types/types"

interface SingleProjectProps {
  allProjects: Project[]
  requestAllProjects: () => void
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
}
const SingleProject = ({allProjects, requestAllProjects, setAppError}: SingleProjectProps) => {
  const [projectToDisplay, setProjectToDisplay] = useState<Project | null>(null)
  const location = useLocation().pathname
  const { projectID } = useParams()
  
  useEffect(() => {
    if (location.includes('saved')) {
      const projectInParams = allProjects?.find(project => project.id === projectID)  
      if (projectInParams) {
        setProjectToDisplay(projectInParams)
      } 
    }
  }, [allProjects, location, projectID])


  return projectToDisplay ? <Results onSavedPage={location.includes('saved')} currentResult={projectToDisplay} allProjects={allProjects} requestAllProjects={requestAllProjects} setAppError={setAppError} /> : <div>Oops! We couldn't find the page you are looking for</div>
}

export default SingleProject