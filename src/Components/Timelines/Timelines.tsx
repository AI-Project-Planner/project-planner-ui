import React, { useState } from 'react';
import './Timelines.css';

interface TimelineProps {
  steps: string[]
}

const Timelines = ({steps}: TimelineProps) => {
  console.log(steps)
  const [currentStep, setCurrentStep] = useState<string>(steps[0]);
  
  const showStep = (step: string) => {
    setCurrentStep(step)
  }

  const stepEls = steps.map(step => {
    return (
      <div className='timeline-container' key={step}>
        <div className={`timeline-circle ${currentStep === step? 'step-focus' : ''}`} onClick={() => showStep(step)}>
          <p className='step-text'>Step</p>
          <p className='step-text'>{steps.indexOf(step)+1}</p>
        </div>
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
      <div className='timeline-detail'>
        <p>{currentStep}</p>
      </div>
    </div>
  )
}

export default Timelines