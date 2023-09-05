import add from '../../../images/add.png';
import ListItem from '../ListItem/ListItem';

interface ListProps {
  isEditing: boolean  
  setter: (value: React.SetStateAction<string[]>) => void
  setterToClear: (value: React.SetStateAction<string>) => void
  featInput: string
  setFeatInput: React.Dispatch<React.SetStateAction<string>>
  editedPieces: string[]
  type: string
}

const List = ({ type, isEditing, setter, setterToClear, featInput, setFeatInput, editedPieces }: ListProps) => {
  const addFeatOrInteraction = (setter: (value: React.SetStateAction<string[]>) => void, setterToClear: (value: React.SetStateAction<string>) => void, newPiece: string) => {
    setter((prev) => [newPiece, ...prev]);
    setterToClear('');
  }

  const features = editedPieces.map((feature) => {
    return (<ListItem listItem={feature} isEditing={isEditing} setter={setter} />);
  });

  return (
    <div className={type}>
    <div className='feat-inter-header'>
      <h3 className={isEditing ? 'editing-header' : ''}>{type ==='features' ? 'Features' : 'Example Interactions'}</h3>
      {isEditing && (
        <form className='results-editing-form' onSubmit={(e) => e.preventDefault()}>
          <input type='text' placeholder={`add ${type === 'features'? 'a feature' : 'an interaction'}`} value={featInput} onChange={(e) => setFeatInput(e.target.value)} />
          <button onClick={() => addFeatOrInteraction(setter, setterToClear, featInput)}>
            <img className='editing-add-button' src={add} alt='add button' />
          </button>
        </form>
      )}
    </div>
    <div className='feat-inter-text'>{features}</div>
  </div>
  )
}

export default List