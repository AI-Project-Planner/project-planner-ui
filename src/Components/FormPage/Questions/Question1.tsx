import React from 'react';
import phone from '../../../images/phone.png';
import pancake from '../../../images/pancake.png';
import web from '../../../images/web.png';

interface Question1Props {
  chooseStack: (e:  React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Question1: React.FC<Question1Props> = ({ chooseStack }) => {

  return (
    <section onClick={(e) => {chooseStack(e)}} className='form-type-container'>
      <div className='frontend frontend-div form-type-icon-container'>
        <img id="frontend" className='frontend form-type-icon' alt='icon for frontend type' src={phone}/>
        <p className='frontend form-type-text'>Front End</p>
      </div>
      <div className='backend backend-div form-type-icon-container'>
        <img id="backend" className='backend form-type-icon' alt='icon for backend type' src={web}/>
        <p className='backend form-type-text'>Back End</p>
      </div>
      <div className='fullstack fullstack-div form-type-icon-container'>
        <img id="fullstack" className='fullstack form-type-icon' alt='icon for fullstack type' src={pancake}/>
        <p className='fullstack form-type-text'>Full Stack</p>
      </div>
    </section>
  )
}

export default Question1