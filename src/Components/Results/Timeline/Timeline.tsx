import { Chrono } from 'react-chrono'
import './Timeline.css'

interface TimelineProps {
  steps: string[],
  timeframe: string,
  timeframeAmt: number
}

const Timeline = ({ steps, timeframe, timeframeAmt}: TimelineProps) => {
  const stepsPerSlide = Math.round(timeframeAmt/ steps.length)
  console.log('stepsPerSlide', stepsPerSlide)

  const timelineArray = []

    for (let i = 0; i < timeframeAmt; i += stepsPerSlide) {
      const slice = steps.slice(i, i + stepsPerSlide);
      timelineArray.push(slice);
    }


  const timelineItems = steps.map((step, i) => {
    // console.log('step', step.map(piece => <p>{piece}</p>))
    return {
      // title: `${timeframe.replaceAll('s', '')} ${i + 1}`,
      title: `Step ${i + 1}`,
      cardDetailedText: step,
    }
  })

  const theme =  {
    primary: '#DBD5D5',
    secondary: '#FFBCD7',
    cardBgColor: '#ffffff80',
    titleColor: 'black',
    titleColorActive: 'white',
  }
  return (
    <div style={{fontSize: '40px'}} className='timeline'>
      <h2 className='summary-header' id='timelineHeader'>Project Timeline</h2>
      <Chrono
        theme={theme}
        // fontSizes={{ cardText: '25px', title: '20px' }}
        slideShow={true}
        items={timelineItems}
        mode="HORIZONTAL"
        classNames={{ cardText: 'my-card-text', card: 'timeline-card' }}
      />
    </div>
  )
}

export default Timeline