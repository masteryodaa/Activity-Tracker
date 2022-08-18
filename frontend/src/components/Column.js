import styled from "styled-components";
import Task from "./Task";
import AddTask from "./AddTask";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-around;
  background-color: #f9c80e;
  padding: 8px;
  border: 1px solid lightgrey;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  padding: 0.5rem;
  // border: 1px solid black;
  // border-radius: 5px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: #f9c80e;
  flex-grow: 1;
  min-height: 100px;
`;

const Column = (props) => {

    const deleteColumn = (columnId, index) => {
        console.log("delete column");
        const columnTasks = props.state.columns[columnId].taskIds;
    
        const finalTasks = columnTasks.reduce((previousValue, currentValue) => {
            const {[currentValue]: oldTask, ...newTasks} = previousValue;
            return newTasks;
        }, props.state.tasks);
        
        const columns = props.state.columns;
        const {[columnId]: oldColumn, ...newColumns} = columns; 
    
        const newColumnOrder = Array.from(props.state.columnOrder);
        newColumnOrder.splice(index, 1);
    
        props.setState({
            tasks: {
                ...finalTasks
            },
            columns: {
                ...newColumns
            },
            columnOrder: newColumnOrder
        });
    }

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container className='card' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Title >{props.column.title} <button className="del" onClick={()=>deleteColumn(props.column.id, props.index)}>❌</button> </Title>
          <Droppable droppableId={props.column.id}  type="task">
            {(provided) => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} columnId={props.column.id} state={props.state} setState={props.setState} />
                ))}
                <AddTask columnId={props.column.id} state={props.state} setState={props.setState} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
