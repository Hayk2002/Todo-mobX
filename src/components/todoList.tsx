import React from "react";
import {observer} from "mobx-react";

import TaskViewBlock from "./todoItem";
import {ITodoItem, ITodoListProps} from "../utils/types";
import {TodoListWrapper} from "./styles";

const TodoList: React.FC<ITodoListProps> = observer(({ todoStore }) => {
    return (
        <TodoListWrapper>
            {todoStore.todoList.map((item: ITodoItem) => (
                <TaskViewBlock
                    {...item}
                    key={item.id}
                    toggleItem={todoStore.toggleTodo}
                    selectItem={todoStore.selectTodo}
                    deleteItem={todoStore.deleteTodo}
                />
            ))}
        </TodoListWrapper>
    );
});

export default TodoList;
