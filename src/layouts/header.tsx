import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";

import { generateTodos } from "../utils/helpers";
import { ITodoListProps } from "../utils/types";
import { HeaderWrapper, Input, Button, CounterBlock } from "./styles";

const Header: React.FC<ITodoListProps> = observer(({ todoStore }) => {
    const [inputValue, setInputValue] = useState<string>("");

    /**
     * Use the bottom hook in order to test 1000 todos handling case.
     * */

    /*useEffect(() => {
        const todos = generateTodos();
        todoStore.setTodoList(todos);
    }, [todoStore])*/

    useEffect(() => {
        todoStore.setSelectedTodos();
        todoStore.setCompletedTodos();
    }, [todoStore, todoStore.todoList]);

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
                <div>Completed {todoStore.completedTodos.length} of {todoStore.todoList.length}</div>
                <div>Selected {todoStore.selectedTodos.length} of {todoStore.todoList.length}</div>
            </CounterBlock>
            {todoStore.selectedTodos.length ?
                <Button
                    type="button"
                    $isDisabled={false}
                    onClick={todoStore.deleteAllSelected}
                >
                    Delete all selected
                </Button>
                : null
            }
            {todoStore.selectedTodos.length && todoStore.selectedTodos.some(item => !item.completed) ?
                <Button
                    type="button"
                    $isDisabled={false}
                    onClick={() => todoStore.toggleAllSelected(true)}
                >
                    Complete all selected
                </Button>
                : null
            }
            {todoStore.selectedTodos.length && todoStore.selectedTodos.some(item => item.completed) ?
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
