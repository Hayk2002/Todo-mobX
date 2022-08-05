import { MainContent } from "./styles";
import TodoList from "../components/todoList";
import { TodoListStore } from "../store/todoListStore";

const Main = () => (
    <MainContent>
        <TodoList todoStore={TodoListStore}/>
    </MainContent>
);

export default Main;
