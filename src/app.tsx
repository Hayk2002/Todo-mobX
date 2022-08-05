import Main from "./layouts/main";
import { Container } from "./styles";
import Header from "./layouts/header";
import {TodoListStore} from "./store/todoListStore";

const App = () => (
    <Container>
        <Header todoStore={TodoListStore} />
        <Main/>
    </Container>
);

export default App;
