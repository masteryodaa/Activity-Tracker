import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
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

const AddTask = (props) => {
  const [newTask, setNewTask] = useState("");
  const [taskButon, setTaskButton] = useState(true);

  const onNewTaskButtonClick = () => {
    setTaskButton(false);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const onNewTaskInputComplete = () => {
    addNewTask(props.columnId, newTask);
    setTaskButton(true);
    setNewTask("");
  };

  //   const newTaskByEnter = (event) => {
  //     if (event.key === "Enter") {
  //         addNewTask(props.columnId, newTask);
  //         setTaskButton(true);
  //         setNewTask("");
  //     }

  const addNewTask = (columnId, content) => {
    const newTaskId = "task" + Math.floor(Math.random() * 100000);

    const column = props.state.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    const newTask = {
      id: newTaskId,
      content: content,
    };

    props.setState({
      ...props.state,
      tasks: {
        ...props.state.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...props.state.columns,
        [columnId]: {
          ...props.state.columns[columnId],
          taskIds: newTaskIds,
        },
      },
    });
  };

  return (
    <Container>
      {taskButon ? (
        <Button onClick={onNewTaskButtonClick}>New Task</Button>
      ) : (
        <Input
          autoFocus
          type="text"
          value={newTask}
          onChange={handleInputChange}
          onBlur={onNewTaskInputComplete}
          //   onKeyDownCapture={newTaskByEnter}
        />
      )}
    </Container>
  );
};

export default AddTask;
