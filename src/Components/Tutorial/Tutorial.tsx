import React, { useState } from 'react'
import homepageLogo from '../../images/drawing.png'
import projectPlanner from '../../images/project-planner.png'
import { useNavigate } from 'react-router-dom'
import { Directions } from '../../Types/FormPageTypes'
import './Tutorial.css'
import arrow from '../../images/arrow.png'
import project1 from '../../images/project1.gif'
import project2 from '../../images/project2.gif'
import project3 from '../../images/project3.gif'

const Tutorial = ({ smallScreen }: { smallScreen: boolean }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate();
  const goToNext = () => {
    if (currentStep === 3) {
      navigate('/form')
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const goToPrev = () => {
    if (currentStep === 1) {
      navigate('/')
    } else {
      setCurrentStep(prev => prev - 1)
    }
  }
  
  const directions: Directions = {
    1: 'Fill out questionnaire regarding your projects details, and click submit to have AI generate a project idea and detailed plan!',
    2: 'View your results, and decide if you want to save it to your favorites, or generate a new project idea!',
    3: 'Want to change things up for a project you\'ve generated? Click on "Edit Plan" to add new features, change the title, make a new color palette, or even generate a logo!'
  }

  const stepCircles = [];
  for (let i = 0; i < 3; i++) {
    stepCircles.push(<div key={`stepcircle${i+1}`} className={`step-circle ${currentStep === i+1 ? 'active': ''}`}></div>)
  }

  const gifs: Directions = {
    1: project1,
    2: project2,
    3: project3
  }

  return (
    <section className='home'>
      <section className='light-section'>
        {!smallScreen && <img className='light' src={homepageLogo} alt='notepad with lightbulb logo for app' />}
        {!smallScreen && <h1 className='homepage-title'>Welcome to the</h1>}
        {!smallScreen && <img src={projectPlanner} className='title-img' alt='project planner text' />}
      </section>
      <section className='popup tutorial-popup'>
        <button className='tutorial-back-btn' onClick={goToPrev} style={{ background: 'none', border: 'none', alignSelf: 'flex-start', position: 'absolute', top: '0' }} ><img src={arrow} alt='back button'/></button>
        <h1 className='homepage-title'>Step {currentStep}</h1>
        <p className='directions'>{directions[currentStep]}</p>
        <div className='tutorial-gif'>
          <img src={gifs[currentStep]} alt='gif of project planner app'/>
        </div>
        <button onClick={goToNext} className='form-button tutorial-btn'>{currentStep !== 3 ? "CONTINUE" : "GET STARTED"}</button>
        <div className='step-circles'>
          {stepCircles}
        </div>
      </section>
    </section>
    )
}

export default Tutorial