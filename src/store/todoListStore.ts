import { action, makeObservable, observable } from "mobx";

import { ITodoItem } from "../utils/types";

export class TodoListStoreImpl {
    todoList: ITodoItem[] = [];
    searchList: ITodoItem[] = [];

    constructor() {
        makeObservable(this, {
            todoList: observable,
            searchList: observable,
            addTodo: action,
            toggleTodo: action,
            selectTodo: action,
            deleteTodo: action,
            deleteAllSelected: action,
            toggleAllSelected: action,
            resetSearchList: action,
            setTodoList: action,
            handleTodoSearch: action,
        });
    }

    addTodo = (title: string) => {
        const item: ITodoItem = {
            id: +Math.random().toFixed(4),
            title,
            completed: false,
            selected: false
        }

        this.todoList.push(item);
    }

    toggleTodo = (id: number) => {
        this.todoList = this.todoList
            .map(item => {
                if (item.id === id) {
                    return {...item, completed: !item.completed};
                }
                return item;
            });
    }

    selectTodo = (id: number) => {
        this.todoList = this.todoList
            .map(item => {
                if (item.id === id) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
    }

    deleteTodo = (id: number) => {
        this.todoList = this.todoList.filter(item => item.id !== id);
    }

    deleteAllSelected = () => {
        this.todoList = this.todoList.filter(item => !item.selected);
    }

    toggleAllSelected = (isCompleted: boolean) => {
        this.todoList = this.todoList.map(item => {
            if (item.selected) {
                return { ...item, completed: isCompleted };
            }
            return item;
        });
    }

    handleTodoSearch = (inputValue: string) => {
        if (inputValue !== "") {
            this.searchList = this.todoList.filter(({ title }) => title.includes(inputValue));
        } else {
            this.searchList = [];
        }
    }

    resetSearchList = () => this.searchList = [];

    /**
     * Use the bottom method in order to test 1000 todos handling case.
    * */

    setTodoList = (list: ITodoItem[]) => {
        this.todoList = list;
    }
}

export const TodoListStore = new TodoListStoreImpl();
