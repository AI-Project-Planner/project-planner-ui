import React from 'react';
import plus from '../../../images/add.png';
import { TechStacks, ErrorMsg } from '../../../Types/FormPageTypes';

interface Question2Props {
  searchTerm: string,
  techStacks: TechStacks,
  stack: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  technologies: string[],
  setError: React.Dispatch<React.SetStateAction<ErrorMsg>>,
  setTechnologies: React.Dispatch<React.SetStateAction<string[]>>
}

const Question2: React.FC<Question2Props> = ({ searchTerm, techStacks, stack, setSearchTerm, technologies, setError, setTechnologies }) => {

  const searchTechnologies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const addTechnology = () => {
    setError({ error: false, message: "" })

    const feFrameworks: string[] = ['react', 'vue', 'angular'];

    const checkTech = techStacks[stack].includes(searchTerm);

    const alreadySaved = (data: string[]) => data.find(tech => tech === searchTerm);

    const feFrameworkChosen = technologies.filter(tech => feFrameworks.includes(tech));

    if (feFrameworks.includes(searchTerm) && feFrameworkChosen.length === 1) {
      return setError({ error: true, message: "You can only choose 1 FE Framework!" })
    }

    if(!checkTech) {
      return setError({ error: true, message: `${searchTerm} is not a Technology you can choose! Sorry!` })
    }

    if (technologies.length === 5) {
      return setError({ error: true, message: "You can only choose up to 5 technologies!" })
    }

    if (searchTerm && !alreadySaved(technologies) && technologies.length < 5 && feFrameworkChosen.length <= 1) {
      setTechnologies(prev => [...prev, searchTerm]);
    }

    setSearchTerm("");
  }

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
      <p className='form-tech-text'>{technologies.length > 0 ? 'Technologies chosen:' : 'Please add technologies'}</p>
      <div className='form-tech-stack-chosen'>
        {technologies.map((tech: string) => <div key={tech} className='form-tech-stack-chosen-single'>{tech}</div>)}
      </div>
    </section>
  )
}

export default Question2