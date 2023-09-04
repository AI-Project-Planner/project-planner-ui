import React, { useEffect, useState } from 'react';
import './Timelines.css';
import doubleleft from '../../images/keyboarddoubleleft.png'
import left from '../../images/keyboardleft.png'
import right from '../../images/keyboardright.png'
import doubleright from '../../images/keyboarddoubleright.png'

interface TimelineProps {
  steps: string[]
}

const Timelines = ({steps}: TimelineProps) => {
  const [currentStep, setCurrentStep] = useState<string>(steps[0]);
  const [stepNum, setStepNum] = useState(0)
  
  const showStep = (step: string, num: number) => {
    setCurrentStep(step)
    setStepNum(num)
  }
  
  const goToNextStep = () => {
    if(stepNum !== steps.length - 1) setStepNum(prev => prev + 1)
  }
  
  const goToPrevStep = () => {
    if(stepNum !== 0) setStepNum(prev => prev - 1)
  }
  
  useEffect(() => {
    setCurrentStep(steps[stepNum])
  }, [stepNum])

  useEffect(() => {
    document.querySelector('.step-focus')?.scrollIntoView({behavior: 'smooth', block: 'nearest'})
  }, [currentStep])

  const stepEls = steps.map((step, i) => {
    return (
      <div className='timeline-container' key={step}>
        <div className={`timeline-circle ${currentStep === step? 'step-focus' : ''}`} onClick={() => showStep(step, i)}>
          <p className='step-text'>Step</p>
          <p className='step-text'>{i+1}</p>
        </div>
      </div>
    )
  })

  const timelineDetails = steps.map(step => {
    return (
      <div className={`${currentStep === step? 'timeline-detail' : 'hidden'}`}>
        <p>{step}</p>
      </div>
    )
  })

  return (
    <div className='timeline-main'>
      <p className='feat-inter-header timeline-header'><b>Timeline</b></p>
      <div className='timeline-page'>
        {stepEls}
      </div>
      <div className='timeline-line'></div>
      <section className='controls'>
        <button onClick={() => setStepNum(0)}><img src={doubleleft} alt='timeline control button to first step' /></button>
        <button onClick={goToPrevStep}><img src={left} alt='timeline control button to previous step' /></button>
        <button onClick={goToNextStep}><img src={right} alt='timeline control button to next step' /></button>
        <button onClick={() => setStepNum(steps.length-1)}><img src={doubleright} alt='timeline control button to last step'/></button>
      </section>
      {/* <div className='timeline-detail'>
        <p>{currentStep}</p>
      </div> */}
       {timelineDetails}
    </div>
  )
}

export default Timelines