import React, { useEffect, useState } from 'react';
import './FormPage.css';
import arrow from '../../images/arrow.png';
import { postNewForm } from '../../apiCalls';
import Question1 from './Questions/Question1';
import Question2 from './Questions/Question2';
import Question3 from './Questions/Question3';
import Question4 from './Questions/Question4';
import {QuestionComponents, TechStacks, ErrorConditions, TimeFrame, ErrorMsg, FormData} from './FormPageTypes'

const FormPage = () => {

  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [stack, setStack] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState<TimeFrame>({amount: 0, type: "days"});
  const [numPeople, setNumPeople] = useState<number>(0);
  const [error, setError] = useState<ErrorMsg>({error: false, message: ""})

  const questions: Record<number, string> = {
    1: "Choose Your Application Type",
    2: "Which Technologies Would You Like to Use?",
    3: "How Long Do You Have to Create This App?",
    4: "How Many Collaborators Will There Be?"
  }

  const techStacks: TechStacks = {
    frontend: ['react', 'typescript', 'javascript', 'vue', 'angular'],
    backend: ['ruby/rails', 'postgresql', 'node', 'sidekiq', 'devise'],
    fullstack: ['react', 'typescript', 'javascript', 'vue', 'angular', 'ruby/rails', 'postgresql', 'node', 'sidekiq', 'devise']
  }

  const questionComponents: QuestionComponents = {
    1: <Question1 chooseStack={(e) => chooseStack(e)} />,
    2: <Question2 setTechnologies={setTechnologies} searchTerm={searchTerm} techStacks={techStacks} setError={setError} stack={stack} setSearchTerm={setSearchTerm} technologies={technologies}/>,
    3: <Question3 setTimeframe={setTimeframe} timeframe={timeframe}/>,
    4: <Question4 numPeople={numPeople} setNumPeople={setNumPeople}/>
  }

  const errorConditions: ErrorConditions = {
    1: [!stack, "Please select stack!"],
    2: [technologies.length < 1, "Please add technologies!"],
    3: [timeframe.amount < 1, "Please select aount of time!"],
    4: [numPeople < 1, "Please select number of collaborators!"]
  }

  const chooseStack = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const id = (e.target as HTMLInputElement).id;
    setStack(id);
  }

  const setActiveFocus = () => {
    const filteredStacks = Object.keys(techStacks).filter(stacks => stacks !== stack);

    document.querySelector(`.${stack}-div`)?.classList.add('form-active-focus');
    filteredStacks.forEach(stacks => document.querySelector(`.${stacks}-div`)?.classList.remove('form-active-focus'));
  }

  const questionInputs = () => {
    return questionComponents[currentQuestion]
  }

  const inputErrors = () => {
    if (errorConditions[currentQuestion][0]) {
      setError({ error: true, message: errorConditions[currentQuestion][1]})
      return true;
    }
  } 

  const submitFormData = () => {
    const formData: FormData = {
      stack, 
      technologies,
      timeFrame: `${timeframe.amount} ${timeframe.type}`,
      collaborators: numPeople
    }
    console.log(formData)
    postNewForm(formData).then(data => {
      console.log(data)
    })
  }

  const nextQuestion = () => {
      if(!inputErrors()) {
      if (currentQuestion < 4) {
        setError({ error: false, message: "" })
        setSearchTerm("");
        setCurrentQuestion(prev => prev + 1);
      } else {
        submitFormData();
      }
    }
  }
 
  const prevQuestion = () => {
    setError({error: false, message: ""})
    setCurrentQuestion(prev => prev - 1);
  }

  useEffect(() => {
    setActiveFocus();
  },[stack, currentQuestion])

  useEffect(() => {
    setTechnologies([]);
  },[stack])

  return (
    <div className='form-page'>
      <section className='form-backdrop'>
        <div className='form-container'>
          <div className='form-question-container'>
            {currentQuestion !== 1 &&
              <div className='form-icon-container'>
                <img className='form-icon' src={arrow} alt='back button' onClick={prevQuestion} />
              </div>}
            <p className='form-question'>{questions[currentQuestion]}</p>
          </div>
          <div className='form-input-container'>
            {questionInputs()}
          </div>
          {error.error && <p className='form-error'>{error.message.toUpperCase()}</p>}
          <button className='form-button' onClick={nextQuestion}>{currentQuestion < 4 ? "CONTINUE" : "SUBMIT"}</button>
        </div>
      </section>
    </div>
  )
}

export default FormPage