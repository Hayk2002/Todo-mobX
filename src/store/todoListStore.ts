import {action, makeObservable, observable} from "mobx";
import {ITodoItem} from "../utils/types";

export class TodoListStoreImpl {
    todoList: ITodoItem[] = [];

    constructor() {
        makeObservable(this, {
            todoList: observable,
            addTodo: action,
            toggleTodo: action,
            selectTodo: action,
            deleteTodo: action,
            deleteAllSelected: action,
            toggleAllSelected: action,
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
}

export const TodoListStore = new TodoListStoreImpl();
