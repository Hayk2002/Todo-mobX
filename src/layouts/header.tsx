import React, {useEffect, useState} from "react";
import {HeaderWrapper, Input, Button, CounterBlock} from "./styles";
import {observer} from "mobx-react";
import {ITodoItem, ITodoListProps} from "../utils/types";

const Header: React.FC<ITodoListProps> = observer(({ todoStore }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedTodos, setSelectedTodos] = useState<ITodoItem[]>([]);
    const [completedTodos, setCompletedTodos] = useState<ITodoItem[]>([]);

    useEffect(() => {
        setSelectedTodos(todoStore.todoList.filter(item => item.selected));
        setCompletedTodos(todoStore.todoList.filter(item => item.completed));
    }, [todoStore.todoList]);

    const handleTodoAddition = () => {
        if (inputValue.length) {
            todoStore.addTodo(inputValue);
            setInputValue("");
        }
    };

    return (
        <HeaderWrapper>
            <Input
                value={inputValue}
                placeholder='Type title'
                onChange={(event) => setInputValue(event.target.value)}
            />
            <Button
                $isDisabled={!inputValue.length}
                onClick={handleTodoAddition}
                >
                Add
            </Button>
            <CounterBlock>
                <div>Completed {completedTodos.length} of {todoStore.todoList.length}</div>
                <div>Selected {selectedTodos.length} of {todoStore.todoList.length}</div>
            </CounterBlock>
            {todoStore.todoList.some(item => item.selected) ?
                <Button
                    $isDisabled={false}
                    onClick={todoStore.deleteAllSelected}
                >
                    Delete all selected
                </Button>
                : null
            }
            {selectedTodos.length && selectedTodos.some(item => !item.completed) ?
                <Button
                    $isDisabled={false}
                    onClick={() => todoStore.toggleAllSelected(true)}
                >
                    Complete all selected
                </Button>
                : null
            }
            {selectedTodos.length && selectedTodos.some(item => item.completed) ?
                <Button
                    $isDisabled={false}
                    onClick={() => todoStore.toggleAllSelected(false)}
                >
                    Incomplete all selected
                </Button>
                : null
            }
        </HeaderWrapper>
    );
});

export default Header;
