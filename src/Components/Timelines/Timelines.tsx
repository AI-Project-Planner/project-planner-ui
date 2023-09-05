import React, { useEffect, useState } from 'react';
import './Timelines.css';
import doubleleft from '../../images/keyboarddoubleleft.png';
import left from '../../images/keyboardleft.png';
import right from '../../images/keyboardright.png';
import doubleright from '../../images/keyboarddoubleright.png';
import play from '../../images/play_arrow_FILL0_wght400_GRAD0_opsz24.png';
import { ControlButtons } from '../../Types/types';

interface TimelineProps {
  steps: string[];
}

const Timelines = ({ steps }: TimelineProps) => {
  const [currentStep, setCurrentStep] = useState<string>(steps[0]);
  const [stepNum, setStepNum] = useState(0);
  const [slideShow, setSlideShow] = useState(false);
  const showStep = (step: string, num: number) => {
    if (!slideShow) {
      setCurrentStep(step);
      setStepNum(num);
    }
  };

  const goToNextStep = () => {
    if (!slideShow && stepNum !== steps.length - 1) {
      setStepNum((prev) => prev + 1);
    }
  };

  const goToPrevStep = () => {
    if (!slideShow && stepNum !== 0) setStepNum((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentStep(steps[stepNum]);
  }, [stepNum]);

  useEffect(() => {
    document.querySelector('.step-focus')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [currentStep]);

  const stepEls = steps.map((step, i) => {
    return (
      <div className='timeline-container' key={step}>
        <div className={`timeline-circle ${currentStep === step ? 'step-focus' : ''}`} onClick={() => showStep(step, i)}>
          <p className='step-text'>Step</p>
          <p className='step-text'>{i + 1}</p>
        </div>
      </div>
    );
  });

  const timelineDetails = steps.map((step) => {
    return (
      <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} key={step}>
        <div className={`${currentStep === step ? 'timeline-detail' : 'hidden'}`}>
          <p>{step}</p>
        </div>
        {slideShow && <div className={`${currentStep === step ? 'slideshow-line' : 'hidden'}`}></div>}
      </div>
    );
  });

  useEffect(() => {
    if (slideShow) {
      steps.forEach((step, i) => {
        if (!i) {
          setStepNum(i);
        } else {
          setTimeout(() => {
            setStepNum(i);
            if (i === steps.length - 1) {
              setSlideShow(false);
            }
          }, 1500 * i);
        }
      });
    }
  }, [slideShow]);

  const playSlideShow = () => {
    setSlideShow(true);
  };

  const buttonOptions:ControlButtons = {
    0: { func: () => { if (!slideShow) setStepNum(0) }, step: 'first', image: doubleleft },
    1: { func: goToPrevStep, step: 'previous', image: left },
    2: { func: goToNextStep, step: 'next', image: right },
    3: { func: () => { if (!slideShow) setStepNum(steps.length - 1) }, step: 'last', image: doubleright },
    4: { func: playSlideShow, step: 'slideshow of each', image: play }
  };

  const controlButtons = Object.keys(buttonOptions).map(i => {
    return (
      <button key={`button${buttonOptions[i].step}`} onClick={buttonOptions[i].func}>
        <img src={buttonOptions[i].image} alt={`timeline control button to ${buttonOptions[i].step} step`} />
      </button>
    );
  })

  return (
    <div className='timeline-main'>
      <p className='feat-inter-header timeline-header'>
        <b>Timeline</b>
      </p>
      <div className='timeline-page'>{stepEls}</div>
      <div className='timeline-line'></div>
      <section className='controls'>
        {!slideShow ? (
          <>
            {controlButtons}
          </>
        ) : (
          <p>Step {stepNum + 1}</p>
        )}
      </section>
      {timelineDetails}
    </div>
  );
};

export default Timelines;
