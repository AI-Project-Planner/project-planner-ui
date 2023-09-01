import { Chrono } from 'react-chrono'
import './Timeline.css'
import React from 'react'

interface TimelineProps {
  steps: string[],
  timeframe: string,
  timeframeAmt: number
}

const Timeline = ({ steps, timeframe, timeframeAmt}: TimelineProps) => {
  const stepsPerSlide = Math.round(timeframeAmt/ steps.length)
  console.log('stepsPerSlide', stepsPerSlide)


  const timelineItems = steps.map((step, i) => {
    return {
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