import { memo } from "react";

import { TodoItemBlock } from "./styles";
import { DeleteButton, SelectButton } from "../layouts/styles";

interface ITaskView {
    id: number;
    title: string;
    completed: boolean;
    selected: boolean;
    toggleItem: (id: number) => void;
    selectItem: (id: number) => void;
    deleteItem: (id: number) => void;
}

const TodoItem = ({ id, title, completed, selected, toggleItem,  selectItem, deleteItem}: ITaskView) =>
    <TodoItemBlock
        $isSelected={selected}
    >
        <div>
            <h3>{title}</h3>
            <span>
                Completed:
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleItem(id)}/>
            </span>
        </div>
        <div>
            <SelectButton onClick={() => selectItem(id)}>{selected ? 'Unselect' : 'Select'}</SelectButton>
            <DeleteButton onClick={() => deleteItem(id)}>Delete</DeleteButton>
        </div>
    </TodoItemBlock>

export default memo(TodoItem);
