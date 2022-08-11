import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

import TodoItem from "./todoItem";
import { Input } from "../layouts/styles";
import { TodoListWrapper } from "./styles";
import { ITodoItem, ITodoListProps } from "../utils/types";

const TodoList: React.FC<ITodoListProps> = observer(({ todoStore }) => {
    const [list, setList] = useState<ITodoItem[]>(todoStore.todoList);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (todoStore.searchList.length || inputValue !== "") {
            setList(todoStore.searchList);
        } else {
            setList(todoStore.todoList);
        }
    }, [inputValue, todoStore.searchList, todoStore.todoList]);

    const handleSearch = (event: any) => {
        const value = event.target.value;
        setInputValue(value);
        todoStore.handleTodoSearch(value);
    };

    const handleSearchReset = () => {
        setInputValue("");
        todoStore.resetSearchList();
    };

    return (
        <TodoListWrapper>
            <div>
                <Input
                    value={inputValue}
                    onChange={handleSearch}
                    placeholder='Search todo'
                    style={{ marginBottom: 30 }}
                />
                {inputValue && <span
                    style={{ marginLeft: 20 }}
                    onClick={handleSearchReset}
                >
                    clear
                </span>}
            </div>
            {list.map((item: ITodoItem) => (
                <TodoItem
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
