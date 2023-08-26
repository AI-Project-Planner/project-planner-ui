import React, { useEffect, useState } from 'react';
import './FormPage.css';
import arrow from '../../images/arrow.png';
import phone from '../../images/phone.png';
import pancake from '../../images/pancake.png';
import web from '../../images/web.png';
import plus from '../../images/add.png';
import { postNewForm } from '../../apiCalls';

interface Indexable {
  [key: string]: any;
}

type TechStacks = Indexable & {
  frontend: string[],
  backend: string[],
  fullstack: string[]
}

interface TimeFrame {
  amount: number,
  type: string
}

interface ErrorMsg {
  error: boolean,
  message: string
}

interface FormData {
  stack: string,
  technologies: string[],
  timeFrame: string,
  collaborators: number
}

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

  const chooseStack = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const id = (e.target as HTMLInputElement).id;
    setStack(id);
  }

  const searchTechnologies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const addTechnology = () => {
    const alreadySaved = technologies.find(tech => tech === searchTerm);
    if(searchTerm && !alreadySaved) {
      setTechnologies(prev=> [...prev, searchTerm ]);
    }
  }

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

  const selectNumPeople = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setNumPeople(parseInt(value));
  }

  const setActiveFocus = () => {
    const filteredStacks = Object.keys(techStacks).filter(stacks => stacks !== stack);

    document.querySelector(`.${stack}-div`)?.classList.add('form-active-focus');
    filteredStacks.forEach(stacks => document.querySelector(`.${stacks}-div`)?.classList.remove('form-active-focus'));
  }

  const questionInputs = () => {
    if (currentQuestion === 1) {
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

    if (currentQuestion === 2) {
        const searchedName = searchTerm.toLowerCase();
        const filteredTech = techStacks[stack].filter((tech: string) => {
          return tech.toLowerCase().includes(searchedName);
        });

        return (
          <section className='form-search-container'>
            <div className='form-tech-input-container'>
              <input className='form-input' type='text' placeholder='ADD TECHNOLOGY' onChange={e => searchTechnologies(e)} onFocus={() => document.getElementById('dropdown')?.classList.remove('hidden')} value={searchTerm} />
              <img src={plus} alt='plus icon to add technology' className='form-icon' onClick={addTechnology} />
            </div>
            <div id='dropdown' className='form-dropdown hidden'>
              {filteredTech.map((tech: string) => <p key={tech} onClick={() => {
                setSearchTerm(`${tech}`);
                document.getElementById('dropdown')?.classList.add('hidden');
              }} className='form-tech-stack'>{tech}</p>)}
            </div>
            <div className='form-tech-stack-chosen'>
              <p className='form-tech-text'>{technologies.length > 0 ? 'Technologies chosen:' : 'Please add technologies'}</p>
              {technologies.map((tech) => <div key={tech} className='form-tech-stack-chosen-single'>{tech}</div>)}
            </div>
          </section>
        )
    }

    if (currentQuestion === 3) {
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

    if (currentQuestion === 4) {
      return (
        <section className='form-search-container'>
          <div className='form-tech-input-container'>
            <input onChange={(e) => selectNumPeople(e)} className='form-input number-input' type='number' min='1' value={numPeople}/>
          </div>
        </section>
      )
    }
  }

  // const checkInputErrors = () => {
  //   if (currentQuestion === 1) {
  //     if(!stack) {
  //       return setError({error: true, message: "Please select stack!"})
  //     }
  //   } else 

  //   if (currentQuestion === 2) {
  //     if(technologies.length < 1) {
  //       return setError({error: true, message: "Please add technologies!"})
  //     }
  //   } else

  //   if (currentQuestion === 3) {
  //     if(timeframe.amount < 1) {
  //       return setError({error: true, message: "Please select amount of time!"})
  //     }
  //   } else

  //   if (currentQuestion === 4) {
  //     if(numPeople < 1) {
  //       return setError({error: true, message: "Please select number of collaborators!"})
  //     }
  //   } else {
  //     return false
  //   }
  // }

  const submitFormData = () => {
    const formData: FormData = {
      stack, 
      technologies,
      timeFrame: `${timeframe.amount} ${timeframe.type}`,
      collaborators: numPeople
    }
    
    postNewForm(formData).then(data => {
      console.log(data)
    })
  }

  const nextQuestion = () => {
    // checkInputErrors();

    if (currentQuestion === 1) {
      if(!stack) {
        return setError({error: true, message: "Please select stack!"})
      }
    } 

    if (currentQuestion === 2) {
      if(technologies.length < 1) {
        return setError({error: true, message: "Please add technologies!"})
      }
    } 

    if (currentQuestion === 3) {
      if(timeframe.amount < 1) {
        return setError({error: true, message: "Please select amount of time!"})
      }
    } 

    if (currentQuestion === 4) {
      if(numPeople < 1) {
        return setError({error: true, message: "Please select number of collaborators!"})
      }
    }

    if (currentQuestion < 4) {
      setError({error: false, message: ""})
      setSearchTerm("");
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitFormData();
    }
  }

  const prevQuestion = () => {
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