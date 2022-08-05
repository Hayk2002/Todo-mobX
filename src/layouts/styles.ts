import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #cbcbcb;
`;

export const MainContent = styled.main`
  margin-top: 30px;
`;

export const Input = styled.input`
  width: 260px;
  padding: 10px;
  outline: none;
  color: #212121;
  border-radius: 20px;
  border: 1px solid #cbcbcb;
  background-color: #cbcbcb;
`;

export const Button = styled.button.attrs(() => ({
    type: "button"
}))`
  color: #ffffff;
  cursor: pointer;
  pointer-events: ${({$isDisabled}: {$isDisabled: boolean}) => $isDisabled && "none"};
  margin-left: 30px;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid #cbcbcb;
  background-color: ${({$isDisabled}: {$isDisabled: boolean}) => $isDisabled ? "#cbcbcb" : "#212121"};
`;

export const SelectButton = styled.button`
  padding: 5px;
  color: #ffffff;
  cursor: pointer;
  border-radius: 6px;
  margin-right: 10px;
  border: 1px solid #49eaa2;
  background-color: #49eaa2;
  transition: ease-in-out 0.3s;

  &:hover {
    background-color: #00ff90;
  }
`;

export const DeleteButton = styled.button`
  padding: 5px;
  color: #ffffff;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid #ea4949;
  background-color: #ea4949;
  transition: ease-in-out 0.3s;

  &:hover {
    background-color: #ff0000;
  }
`;

export const CounterBlock = styled.div`
  display: flex;
  margin-left: 30px;
  align-items: center;
  
  & div:first-child {
    margin-right: 20px;
  }
`;

export const ExtraButtonsBlock = styled.div`
  display: flex;
  margin-left: 30px;
  align-items: center;
`;
