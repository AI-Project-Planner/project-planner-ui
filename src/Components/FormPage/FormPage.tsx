import React, { useState } from 'react';
import './FormPage.css';
import arrow from '../../images/arrow.png';
import phone from '../../images/phone.png';
import pancake from '../../images/pancake.png';
import web from '../../images/web.png';
import plus from '../../images/add.png';

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

  const questions: Record<number, string> = {
    1: "Choose Your Application Type",
    2: "Which Technologies Would You Like to Use?",
    3: "How Long Do You Have to Create This App?",
    4: "How Many Collaborators Will There Be?"
  }

  const chooseStack = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const id = (e.target as HTMLInputElement).id;
    setStack(id);
  }

  const techStacks: TechStacks = {
    frontend: ['react', 'typescript', 'javascript', 'vue', 'angular'],
    backend: ['ruby/rails', 'postgresql', 'node', 'sidekiq', 'devise'],
    fullstack: ['react', 'typescript', 'javascript', 'vue', 'angular', 'ruby/rails', 'postgresql', 'node', 'sidekiq', 'devise']
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
    setNumPeople(parseInt(value))
  }


  const questionInputs = () => {
    if (currentQuestion === 1) {
      return (
        <section onClick={(e) => chooseStack(e)} className='form-type-container'>
          <div  className='form-type-icon-container'>
            <img id="frontend" className='form-type-icon' alt='icon for frontend type' src={phone}/>
            <p className='form-type-text'>Front End</p>
          </div>
          <div className='form-type-icon-container'>
            <img id="backend" className='form-type-icon' alt='icon for backend type' src={web}/>
            <p className='form-type-text'>Back End</p>
          </div>
          <div className='form-type-icon-container'>
            <img id="fullstack" className='form-type-icon' alt='icon for fullstack type' src={pancake}/>
            <p className='form-type-text'>Full Stack</p>
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
            <input className='form-input' type='text' placeholder='ADD TECHNOLOGY' onChange={e => searchTechnologies(e)} onFocus={() => document.getElementById('dropdown')?.classList.remove('hidden')} value={searchTerm}/>
            <img src={plus} alt='plus icon to add technology' className='form-icon' onClick={addTechnology}/>
          </div>
          <div id='dropdown' className='form-dropdown hidden'>
            {filteredTech.map((tech: string) => <p key={tech} onClick={()=> {
              setSearchTerm(`${tech}`);
              document.getElementById('dropdown')?.classList.add('hidden');
              }} className='form-tech-stack'>{tech}</p>)}
          </div>
          <div className='form-tech-stack-chosen'>
            {technologies.map((tech) => <div key={tech} className='form-tech-stack-chosen-single'>{tech}</div>)}
          </div>
        </section>
      )
    }

    if (currentQuestion === 3) {
      return (
        <section className='form-search-container'>
          <div className='form-tech-input-container'>
            <input onChange={(e) => selectTime(e)} name='amount'className='form-input number-input' type='number' min='1' value={timeframe.amount}/>
            <select onChange={(e) => selectTime(e)} name='type' className='form-input number-input' value={timeframe.type}>
              <option value='day'>Days</option>
              <option value='week'>Weeks</option>
              <option value='month'>Months</option>
            </select>
          </div>
        </section>
      )
    }



  const inputErrors = () => {
    if (!stack) {
      return "Must select stack before confinuing!"
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < 4) {
      setSearchTerm("");
      setCurrentQuestion(prev => prev + 1);
    } else {
  }

  const prevQuestion = () => {
    setCurrentQuestion(prev => prev - 1);
  }

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
          <button className='form-button' onClick={nextQuestion}>{currentQuestion < 4 ? "CONTINUE" : "SUBMIT"}</button>
        </div>
      </section>
    </div>
  )
}

export default FormPage