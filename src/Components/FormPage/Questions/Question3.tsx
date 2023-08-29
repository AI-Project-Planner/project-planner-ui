import React from 'react';
import { TimeFrame } from '../../../Types/FormPageTypes';

interface Question3Props {
  setTimeframe: React.Dispatch<React.SetStateAction<TimeFrame>>,
  timeframe: TimeFrame
}

const Question3: React.FC<Question3Props> = ({setTimeframe, timeframe}) => {

  const selectTime = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setTimeframe(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <section className='form-search-container'>
      <div className='form-tech-input-container'>
        <input onChange={(e) => selectTime(e)} name='amount' className='form-input number-input' type='number' min='1' value={timeframe.amount} />
        <select onChange={(e) => selectTime(e)} name='type' className='form-input number-input' value={timeframe.type}>
          <option value='day'>Days</option>
          <option value='week'>Weeks</option>
          <option value='month'>Months</option>
        </select>
      </div>
    </section>
  )
}

export default Question3