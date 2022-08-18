import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 0.5rem;
    padding: 0.2rem 1rem;
    background-color: #d9ed92;
    font-size: 1.5rem;
`;

const Task = (props) => {   

    const deleteTask = (columnId, index, taskId) => {
        const column = props.state.columns[columnId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(index, 1);
    
        const tasks = props.state.tasks;
        const {[taskId]: oldTask, ...newTasks} = tasks;
    
        props.setState({
            ...props.state,
            tasks: {
                ...newTasks
            },
            columns: {
                ...props.state.columns,
                [columnId]: {
                    ...column,
                    taskIds: newTaskIds
                }
            }
        });
    }
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided) => (
                <Container className="card" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {props.task.content}
                    <span className="del" onClick={() => deleteTask(props.columnId, props.index, props.task.id)}>✖</span>
                </Container>
            )}
        </Draggable>
    );
}
 
export default Task;