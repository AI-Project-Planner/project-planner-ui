import React from 'react';
import plus from '../../../images/add.png';
import { TechStacks, ErrorMsg, ErrorConditionsQ2 } from '../../../Types/FormPageTypes';

interface Question2Props {
  searchTerm: string;
  techStacks: TechStacks;
  stack: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  technologies: string[];
  setError: React.Dispatch<React.SetStateAction<ErrorMsg>>;
  setTechnologies: React.Dispatch<React.SetStateAction<string[]>>;
}

const Question2: React.FC<Question2Props> = ({ searchTerm, techStacks, stack, setSearchTerm, technologies, setError, setTechnologies }) => {

  const searchTechnologies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const feFrameworks: string[] = ['react', 'vue', 'angular'];

  const alreadySaved = (data: string[]) => data.find((tech) => tech === searchTerm);

  const feFrameworkChosen = technologies.filter((tech) => feFrameworks.includes(tech));

  const feError = feFrameworks.includes(searchTerm) && feFrameworkChosen.length === 1;

  const selectionError = searchTerm && !alreadySaved(technologies) && technologies.length < 5 && feFrameworkChosen.length <= 1;

  const filteredTech = techStacks[stack].filter((tech: string) => {
    return tech.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectionErrors: ErrorConditionsQ2 = {
    1: [feError, () => (setError({ error: true, message: 'You can only choose 1 FE Framework!' }))],
    2: [!techStacks[stack].includes(searchTerm), () => {setError({ error: true, message: `${searchTerm} is not a Technology you can choose! Sorry!` })}],
    3: [technologies.length === 5, () => {setError({ error: true, message: 'You can only choose up to 5 technologies!' })}],
    4: [selectionError, () => {setTechnologies((prev) => [...prev, searchTerm])}]
  }
  
  const addTechnology = () => {
    setError({ error: false, message: '' });

    for (let error in selectionErrors) {
      if(selectionErrors[error][0]) {
         selectionErrors[error][1]()
      }
    }

    setSearchTerm('');
  };

  return (
    <section className='form-search-container'>
      <div className='form-tech-input-container'>
        <input className='form-input' type='text' placeholder='ADD TECHNOLOGY' onChange={(e) => searchTechnologies(e)} onFocus={() => document.getElementById('dropdown')?.classList.remove('hidden')} value={searchTerm} />
        <img src={plus} alt='plus icon to add technology' className='form-icon' onClick={addTechnology} />
      </div>
      <div id='dropdown' className='form-dropdown hidden'>
        {filteredTech.map((tech: string) => (
          <p key={tech} onClick={() => { setSearchTerm(`${tech}`); document.getElementById('dropdown')?.classList.add('hidden');}} className='form-tech-stack'>
          {tech}
          </p>
        ))}
      </div>
      <p className='form-tech-text'>{technologies.length > 0 ? 'Technologies chosen:' : 'Please add technologies'}</p>
      <div className='form-tech-stack-chosen'>
        {technologies.map((tech: string) => (
          <div key={tech} className='form-tech-stack-chosen-single'>
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
};


export default Question2;
