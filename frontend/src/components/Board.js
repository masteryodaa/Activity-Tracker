import styled from "styled-components";
import { useState, useEffect } from "react";
import Column from "./Column";
import AddColumn from "./AddColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Logout from "./Logout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  //   width: 100vw;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
`;

const Board = (props) => {
  const initialData = { tasks: {}, columns: {}, columnOrder: [] };

  const [state, setState] = useState(initialData);

  useEffect(() => {
    fetchBoard().then((data) => setState(data));
    // eslint-disable-next-line
  }, [props.token]);

  useEffect(() => {
    if (state !== initialData) {
      saveState();
    }
    // eslint-disable-next-line
}, [state, initialData]);

  const saveState = async () => {
    
    console.log(state);
    const res = await fetch("http://localhost:8000/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,

      },
      body: JSON.stringify(state),
    });

    const data = await res.json();
    console.log(data);
  };

  const fetchBoard = async () => {
    const response = await fetch("http://localhost:8000/board",{
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data.board;
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setState({
        ...state,
        columnOrder: newColumnOrder,
      });
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setState({
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            <h1>Activity Tracker</h1>
            <AddColumn state={state} setState={setState} />
            <Logout />
            <Card>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
                );
                return (
                  <Column
                    column={column}
                    tasks={tasks}
                    index={index}
                    key={index}
                    state={state}
                    setState={setState}
                  />
                );
              })}
            </Card>
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
