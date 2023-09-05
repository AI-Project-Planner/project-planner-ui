import React, { useEffect, useState } from 'react';
import './Timelines.css';
import doubleleft from '../../images/keyboarddoubleleft.png';
import left from '../../images/keyboardleft.png';
import right from '../../images/keyboardright.png';
import doubleright from '../../images/keyboarddoubleright.png';
import play from '../../images/play_arrow_FILL0_wght400_GRAD0_opsz24.png';
import pause from '../../images/stop_FILL0_wght400_GRAD0_opsz24.png';
import { useRef } from 'react';
// import { clearTimeout } from 'timers';

interface TimelineProps {
  steps: string[];
}

const Timelines = ({ steps }: TimelineProps) => {
  const [currentStep, setCurrentStep] = useState<string>(steps[0]);
  const [stepNum, setStepNum] = useState(0);
  const [slideShow, setSlideShow] = useState(false);
  let timer = useRef<NodeJS.Timeout | number>(0);

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
          timer.current = setTimeout(() => {
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
            <button
              onClick={() => {
                if (!slideShow) setStepNum(0);
              }}
            >
              <img src={doubleleft} alt='timeline control button to first step' />
            </button>
            <button onClick={goToPrevStep}>
              <img src={left} alt='timeline control button to previous step' />
            </button>
            <button onClick={goToNextStep}>
              <img src={right} alt='timeline control button to next step' />
            </button>
            <button
              onClick={() => {
                if (!slideShow) setStepNum(steps.length - 1);
              }}
            >
              <img src={doubleright} alt='timeline control button to last step' />
            </button>
            <button onClick={playSlideShow}>
              <img src={play} alt='timeline control button to play slideshow' />
            </button>
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
