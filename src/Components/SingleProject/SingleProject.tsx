import Results from '../Results/Results';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Project } from '../../Types/types';
import Empty from '../Empty/Empty';
import spinner from '../../images/spinner.gif';
import React from 'react';

interface SingleProjectProps {
  allProjects: Project[];
  requestAllProjects: () => void;
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>;
  getAllProjects: () => Promise<Project[]>;
}

const SingleProject = ({ allProjects, getAllProjects, requestAllProjects, setAppError }: SingleProjectProps) => {
  const [projectToDisplay, setProjectToDisplay] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation().pathname;
  const { projectID } = useParams();

  const findProjectToDisplay = async () => {
    setLoading(true);
    try {
      const projectList = await getAllProjects();
      const projectInParams = projectList.find((project) => project.id === projectID);
      if (projectInParams) {
        setProjectToDisplay(projectInParams);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) setAppError(error);
    }
  };

  useEffect(() => {
    findProjectToDisplay();
  }, [allProjects, location, projectID]);

  if (loading) {
    return (
      <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img style={{ borderRadius: '50%' }} src={spinner} alt='loading symbol' />
      </div>
    );
  }

  return projectToDisplay ? <Results onSavedPage={location.includes('saved')} currentResult={projectToDisplay} requestAllProjects={requestAllProjects} setAppError={setAppError} /> : <Empty />;
};

export default SingleProject;
