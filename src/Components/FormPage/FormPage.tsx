import React, { useEffect, useState } from 'react';
import './FormPage.css';
import arrow from '../../images/arrow.png';
import { postNewForm } from '../../apiCalls';
import Question1 from './Questions/Question1';
import Question2 from './Questions/Question2';
import Question3 from './Questions/Question3';
import Question4 from './Questions/Question4';
import {QuestionComponents, TechStacks, ErrorConditions, TimeFrame, ErrorMsg, FormData} from '../../Types/FormPageTypes';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../Types/types';
import form from '../../images/form.png';

interface FormPageProps {
  updateCurrentResult: (result: Project) => void,
  updateFormData: (formData: FormData) => void,
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
}

const FormPage: React.FC<FormPageProps> = ({ setAppError, updateCurrentResult, updateFormData }) => {

  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [stack, setStack] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState<TimeFrame>({amount: 0, type: "days"});
  const [numPeople, setNumPeople] = useState<number>(0);
  const [error, setError] = useState<ErrorMsg>({error: false, message: ""});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
    1: <Question1 currentStack={stack} chooseStack={(e) => chooseStack(e)} />,
    2: <Question2 setTechnologies={setTechnologies} searchTerm={searchTerm} techStacks={techStacks} setError={setError} stack={stack} setSearchTerm={setSearchTerm} technologies={technologies}/>,
    3: <Question3 setTimeframe={setTimeframe} timeframe={timeframe}/>,
    4: <Question4 numPeople={numPeople} setNumPeople={setNumPeople}/>
  }

  const errorConditions: ErrorConditions = {
    1: [!stack, "Please select stack!"],
    2: [technologies.length < 1, "Please add technologies!"],
    3: [timeframe.amount < 1, "Please select amount of time!"],
    4: [numPeople < 1, "Please enter number of collaborators!"]
  }

  const chooseStack = (stack: string): void => {
    setStack(stack);
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

  const submitFormData = async () => {
    setLoading(true);
    const formData: FormData = {
      type: stack, 
      technologies: technologies.join(', '),
      time: `${timeframe.amount} ${timeframe.type}`,
      collaborators: numPeople
    };

    updateFormData(formData);

     postNewForm(formData).then(data => {
      updateCurrentResult(data.data);
      setLoading(false);
      navigate('/results');
     })
     .catch(err => {
      setAppError(err)
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
    setTechnologies([]);
  },[stack])

  useEffect(() => {
    setAppError(null)
  },[])

  return (
    <div className='form-page'>
      {window.innerWidth >= 850 && <section className='form-left'>
        <img className='form-logo' src={form} alt='pencil logo for form' />
        <div className='form-left-question'>
          
        </div>
      </section>}
      <section className='form-backdrop'>
        {loading ?
        <Loader /> :
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
          {!loading  && <button className='form-button' onClick={nextQuestion}>{currentQuestion < 4 ? "CONTINUE" : "SUBMIT"}</button>}
        </div>}
      </section>
    </div>
  )
}

export default FormPage