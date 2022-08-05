import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";

import TaskViewBlock from "./todoItem";
import {ITodoItem, ITodoListProps} from "../utils/types";
import {TodoListWrapper} from "./styles";
import {Input} from "../layouts/styles";

const TodoList: React.FC<ITodoListProps> = observer(({ todoStore }) => {
    const [list, setList] = useState<ITodoItem[]>(todoStore.todoList);

    useEffect(() => {
        setList(todoStore.todoList);
    }, [todoStore.todoList]);

    const handleSearch = (event: any) => {
        const inputValue = event.target.value;

        if (inputValue !== '') {
            const result = todoStore.todoList.filter(item => item.title.includes(inputValue));
            setList(result);
        } else {
            setList(todoStore.todoList);
        }
    };

    return (
        <TodoListWrapper>
            {todoStore.todoList.length ? (
                <Input
                    onChange={handleSearch}
                    placeholder='Search todo'
                    style={{marginBottom: 30}}
                />
            ) : null}
            {list.map((item: ITodoItem) => (
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
