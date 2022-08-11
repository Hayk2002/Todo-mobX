import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";

import { generateTodos} from "../utils/helpers";
import {ITodoItem, ITodoListProps} from "../utils/types";
import {HeaderWrapper, Input, Button, CounterBlock} from "./styles";

const Header: React.FC<ITodoListProps> = observer(({ todoStore }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedTodos, setSelectedTodos] = useState<ITodoItem[]>([]);
    const [completedTodos, setCompletedTodos] = useState<ITodoItem[]>([]);

    /**
     * Use the bottom hook in order to test 1000 todos handling case.
     * */

    /*useEffect(() => {
        const todos = generateTodos();
        todoStore.setTodoList(todos);
    }, [todoStore])*/

    useEffect(() => {
        setSelectedTodos(todoStore.todoList.filter(item => item.selected));
        setCompletedTodos(todoStore.todoList.filter(item => item.completed));
    }, [todoStore.todoList]);

    const handleTodoAddition = (event: any) => {
        event.preventDefault();

        if (inputValue.length) {
            todoStore.addTodo(inputValue);
            setInputValue("");
        }
    };

    return (
        <HeaderWrapper onSubmit={handleTodoAddition}>
            <Input
                value={inputValue}
                placeholder='Type title'
                onChange={(event) => setInputValue(event.target.value)}
            />
            <Button
                type="submit"
                $isDisabled={!inputValue.length}
                >
                Add
            </Button>
            <CounterBlock>
                <div>Completed {completedTodos.length} of {todoStore.todoList.length}</div>
                <div>Selected {selectedTodos.length} of {todoStore.todoList.length}</div>
            </CounterBlock>
            {todoStore.todoList.some(item => item.selected) ?
                <Button
                    type="button"
                    $isDisabled={false}
                    onClick={todoStore.deleteAllSelected}
                >
                    Delete all selected
                </Button>
                : null
            }
            {selectedTodos.length && selectedTodos.some(item => !item.completed) ?
                <Button
                    type="button"
                    $isDisabled={false}
                    onClick={() => todoStore.toggleAllSelected(true)}
                >
                    Complete all selected
                </Button>
                : null
            }
            {selectedTodos.length && selectedTodos.some(item => item.completed) ?
                <Button
                    type="button"
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
