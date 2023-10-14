import React from 'react';
import phone from '../../../images/phone.png';
import pancake from '../../../images/pancake.png';
import web from '../../../images/web.png';

interface Question1Props {
  chooseStack: (stack: string) => void;
  currentStack: string;
}

const Question1: React.FC<Question1Props> = ({ chooseStack, currentStack }) => {
  const stacks = [
    { type: 'frontend', name: 'Front End', img: phone },
    { type: 'backend', name: 'Back End', img: web },
    { type: 'fullstack', name: 'Full Stack', img: pancake },
  ];
  const stackElements = stacks.map((stack) => {
    return (
      <button tabIndex={0} onClick={() => chooseStack(stack.type)} key={stack.type} className={`form-type-icon-container ${currentStack === stack.type ? 'form-active-focus' : ''}`}>
        <img className={`form-type-icon`} alt={`icon for ${stack.type} type`} src={stack.img} />
        <p className={`form-type-text`}>{stack.name}</p>
      </button>
    );
  });

  return <section className='form-type-container'>{stackElements}</section>;
};

export default Question1;
