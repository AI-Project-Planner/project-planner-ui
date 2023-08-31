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
    primary: '#BBA9A9',
    secondary: '#EEE4E1',
    cardBgColor: '#ffffff80',
    titleColor: 'black',
    titleColorActive: 'black',
  }
  return (
    <div style={{fontSize: '40px'}} className='timeline'>
      <h2 className='summary-header'>Project Timeline</h2>
      <Chrono
        theme={theme}
        fontSizes={{ cardText: '20px', title: '20px' }}
        slideShow={true}
        items={timelineItems}
        mode="HORIZONTAL"
        classNames={{ cardText: 'my-card-text', card: 'timeline-card' }}
      />
    </div>
  )
}

export default Timeline