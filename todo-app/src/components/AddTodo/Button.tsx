import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface TaskAddButtonProps {
    onClick: () => void;
}

const TaskAddButton: React.FC<TaskAddButtonProps> = ({onClick}) => {
    return (
        <Button variant="contained" onClick={onClick}>Добавить</Button>
    )
}

export default TaskAddButton;