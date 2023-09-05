import deleteBtn from '../../../images/delete.png'

interface ListProps {
  isEditing: boolean
  listItem: string
  setter: (value: React.SetStateAction<string[]>) => void
}

const ListItem = ({ isEditing, listItem, setter }: ListProps) => {
  const deleteFeatOrInter = (setter: (value: React.SetStateAction<string[]>) => void, pieceToDelete: string) => {
    setter((prev) => prev.filter((piece) => piece !== pieceToDelete));
  }

  return (
    <div className='feat-interaction-container' key={listItem}>
      <p className='feature'>&#x2022;{listItem}</p>
      {isEditing && (
        <button className='delete-btn' onClick={() => deleteFeatOrInter(setter, listItem)}>
          <img className='editing-add-button' src={deleteBtn} alt='delete button' />
        </button>
      )}
    </div>
  );
}

export default ListItem