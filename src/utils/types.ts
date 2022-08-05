import {TodoListStoreImpl} from "../store/todoListStore";

export interface ITodoListProps {
    todoStore: TodoListStoreImpl
}

export interface ITodoItem {
    id: number;
    title: string;
    selected: boolean
    completed: boolean;
}
