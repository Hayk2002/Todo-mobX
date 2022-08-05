import styled from "styled-components";

export const TodoListWrapper = styled.ul`
  padding: 0;
  list-style: none;
`;

export const TodoItemBlock = styled.li`
  width: 300px;
  padding: 10px;
  display: flex;
  cursor: pointer;
  max-width: 300px;
  border-radius: 5px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  border: ${({$isSelected}: { $isSelected: boolean }) => $isSelected && '1px solid aqua'};
  border-left: 10px solid aqua;
  transition: ease-in-out 0.3s;

  h3 {
    margin: 0 0 10px 0;
  }
  
  &:hover {
    box-shadow: 0 1px 15px #888888;
  }
`;
