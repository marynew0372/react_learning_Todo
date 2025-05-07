import * as React from 'react';
import { useState } from 'react';
import TextField from './TextField';
import TaskAddButton from './Button';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

const AlertWrapper = styled.div`
    margin-bottom: 10px;
`

interface AddTodoProps {
    onAddTask: (task: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({onAddTask}) => {
    const [task, setTask] = useState('');
    const [error, setError] = useState(false);

    //записываем значение в task
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
        setError(false);
    }

    //при нажатии кнопки передаем значение task родителю App для записи в массив tasks
    const handleAddTaskButton = () => {
        if (task.trim()) {
            onAddTask(task);
            setTask('')
        } else {
            setError(true);
        }
    }

    return (
        <>
            <AlertWrapper>
                {error && <Alert severity='error'>Не задано имя задачи</Alert>}
            </AlertWrapper>
            <div className='add-todo'>
                <TextField value={task} onChange={handleInputChange}></TextField>
                <TaskAddButton onClick={handleAddTaskButton}></TaskAddButton>
            </div>
        </>
    )
}

export default AddTodo;