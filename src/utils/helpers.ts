/**
 * Use this function if you want to test the application performance of how much todos can be handled precisely.
 * For the default case 1000 todos will be used.
* */

import { ITodoItem } from "./types";

export const generateTodos = (range: number = 1000) => {
    const result: ITodoItem[] = [];

    for (let i = 1; i <= range; i++) {
        const todo = {
            id: i,
            title: `Todo-${i}`,
            selected: false,
            completed: false
        };

        result.push(todo);
    }

    return result;
};
