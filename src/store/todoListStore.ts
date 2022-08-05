import {action, makeObservable, observable} from "mobx";
import {ITodoItem} from "../utils/types";

export class TodoListStoreImpl {
    todoList: ITodoItem[] = [];
    searchedList: ITodoItem[] = [];

    constructor() {
        makeObservable(this, {
            todoList: observable,
            searchedList: observable,
            addTodo: action,
            toggleTodo: action,
            selectTodo: action,
            deleteTodo: action,
            deleteAllSelected: action,
            toggleAllSelected: action,
            searchTodos: action,
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
                    console.log(item)
                    return {...item, completed: !item.completed};
                }
                return item;
            });
    }

    selectTodo = (id: number) => {
        this.todoList = this.todoList
            .map(item => {
                if (item.id === id) {
                    console.log(item)
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

    searchTodos = (title: string) => {
        this.searchedList = this.todoList.filter(item => item.title.includes(title));
    };
}

export const TodoListStore = new TodoListStoreImpl();
