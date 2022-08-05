import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";

import TaskViewBlock from "./todoItem";
import {ITodoItem, ITodoListProps} from "../utils/types";
import {TodoListWrapper} from "./styles";
import {Input} from "../layouts/styles";

const TodoList: React.FC<ITodoListProps> = observer(({ todoStore }) => {
    const [list, setList] = useState<ITodoItem[]>(todoStore.todoList);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (todoStore.searchedList.length) {
            setList(todoStore.searchedList);
        }

        if (!todoStore.searchedList.length && inputValue.length) {
            setList([]);
        }

        if (!todoStore.searchedList.length && !inputValue.length) {
            setList(todoStore.todoList);
        }
    }, [todoStore.todoList, todoStore.searchedList, inputValue]);

    const handleSearch = (event: any) => {
        setInputValue(event.target.value);
        todoStore.searchTodos(event.target.value);
    };

    return (
        <TodoListWrapper>
            {todoStore.todoList.length ? (
                <Input
                    value={inputValue}
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
