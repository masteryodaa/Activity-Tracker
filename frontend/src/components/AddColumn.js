import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
//   border: 1px solid black;
// margin-bottom: 4rem;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid lightgrey;
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.2rem 1rem;
  background-color: #f5f5f5;
  font-size: 1.5rem;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid lightgrey;
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.2rem 1rem;
  background-color: #98c1d9;
  font-size: 1.5rem;
  color: #000;
  cursor: pointer;
`;

const AddColumn = (props) => {
  const [newColumn, setNewColumn] = useState("");
  const [columnButton, setColumnButton] = useState(true);

  const onNewColumnButtonClick = () => {
    setColumnButton(false);
  };

  const handleInputChange = (event) => {
    setNewColumn(event.target.value);
  };

  const onNewColumnInputComplete = () => {
    addNewColumn(newColumn);
    setColumnButton(true);
    setNewColumn("");
  };

  const addNewColumn = (title) => {
    const newColumnOrder = Array.from(props.state.columnOrder);
    const newColumnId = "column" + Math.floor(Math.random() * 100000);
    newColumnOrder.push(newColumnId);

    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: [],
    };

    props.setState({
      ...props.state,
      columnOrder: newColumnOrder,
      columns: {
        ...props.state.columns,
        [newColumnId]: newColumn,
      },
    });
  };

 

  return(
    <Container>
    {columnButton ? (
      <Button onClick={onNewColumnButtonClick}>New Column</Button>
    ) : (
      <Input
        autoFocus
        type="text"
        value={newColumn}
        onChange={handleInputChange}
        onBlur={onNewColumnInputComplete}
        //   onKeyDownCapture={newTaskByEnter}
      />
    )}
  </Container>
  );
};

export default AddColumn;
