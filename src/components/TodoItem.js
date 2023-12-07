import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

// Configure item for drag and drop
const TodoItem = ({ item, index, moveItem, deleteItem, toggleCompleted }) => {
  const [, drag] = useDrag({
    type: ItemTypes.TODO_ITEM,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TODO_ITEM,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))}>
      <input
        type="checkbox"
        className="checkbox"
        checked={item.completed}
        onChange={() => toggleCompleted(item.id)}
      />
      <div className="content">
        <span className={item.completed ? 'completed' : ''}>{item.value}</span>
        <div className="due-date">
          <span className="due">Due: {item.dueDate}</span>
        </div>
      </div>
      <button
        onClick={() => { deleteItem(item.id) }}
        className="close"
      >
        &times;
      </button>
    </div>
  );
};

export default TodoItem;