import './Loader.css'
import loadingGif from '../../images/loadingBar.gif'
import { useState, useEffect } from 'react'

const Loader = () => {
  const [secondStatement, setSecondStatement] = useState(false)

  useEffect(() => {
    const timerID = setTimeout(() => setSecondStatement(true), 2500)
    return () => clearTimeout(timerID)
  }, [])

  return (
    <section className='loader'>
      <h1 className={`first-loading-statement ${secondStatement ? 'hidden' : ''}`}>Computing AI Results...</h1>
      <h1 className={`${secondStatement ? 'second-loading-statement ' : 'hidden'}`}>Generating your plan...</h1>
      <img src={loadingGif}  alt='progress bar with stripes to demonstrate loading' />
    </section>
  )
}

export default Loader 