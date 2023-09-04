import { Chrono } from 'react-chrono'
import './Timeline.css'
import React from 'react'
import { useEffect } from 'react'

interface TimelineProps {
  steps: string[],
}

const Timeline = ({ steps }: TimelineProps) => {
  useEffect(() => {
    console.log('steps', steps)
  }, [])
  // const stepsPerSlide = Math.round(timeframeAmt/ steps.length)

  const timelineItems = steps.map((step, i) => {
    return {
      title: `Step ${i + 1}`,
      cardDetailedText: step,
      // timelineContent: <p>{step}</p>
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