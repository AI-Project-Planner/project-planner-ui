import React from 'react';

interface Question4Props {
  setNumPeople: React.Dispatch<React.SetStateAction<number>>;
  numPeople: number;
}

const Question4: React.FC<Question4Props> = ({ setNumPeople, numPeople }) => {
  const selectNumPeople = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (value) {
      setNumPeople(parseInt(value));
    }
  };

  return (
    <section className='form-search-container'>
      <div className='form-tech-input-container'>
        <input onChange={(e) => selectNumPeople(e)} className='form-input number-input' type='number' min='1' value={numPeople} />
      </div>
    </section>
  );
};

export default Question4;
