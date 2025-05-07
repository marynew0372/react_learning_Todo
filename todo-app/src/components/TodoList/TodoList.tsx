import { useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import EditTodo from '../EditTodo/EditTodo';
import { TaskDate } from '../../App';
import { ListContainer, ButtonSort } from './TodoList.styles';
import { EditIconCustom, DeleteIconCustom, SwapVertIconCustom } from './TodoList.styles';
import { saveTasksToLocalStorage } from '../../utils/localStorage';
import './styles.css'



interface TodoListProps {
    tasks: TaskDate[];
    setTasks: React.Dispatch<React.SetStateAction<TaskDate[]>>;
    onDelete: (index: number) => void;
    onEdit: (index: number, task: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({tasks, setTasks, onDelete, onEdit}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [ascending, setAscending] = useState(true);

    const handleDialogOpen = (task: string, index: number) => {
        setCurrentTask(task);
        setCurrentIndex(index);
        setIsDialogOpen(true);
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setCurrentTask('');
        setCurrentIndex(null);
    }

    const handleSaveTask = (newTask: string) => {
        if (currentIndex !== null) {
            onEdit(currentIndex, newTask)
        }
    }

    const handleSortToggle = () => {
        setAscending(!ascending); // Переключаем значение ascending
        sortTasksByDate(!ascending); // Передаем новое значение в функцию сортировки
    };

    const sortTasksByDate = (ascending: boolean = true) => {
        const sortedTasks = [...tasks].sort((a, b) => {
            return ascending
                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                : new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setTasks(sortedTasks);
    };

    const handleToggleCheckbox = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].checkbox = !updatedTasks[index].checkbox;
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    }
    
    return (
        <> 
            <ButtonSort>
                <IconButton onClick={() => handleSortToggle()}>
                    <SwapVertIconCustom />
                </IconButton>
            </ButtonSort>
            <ListContainer className='list'>
                {tasks.length === 0 ? (
                    <p className='msgNoTask'>Список задач пуст</p>
                ) : (
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {tasks.map((task, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                        <Checkbox
                            onChange={() => handleToggleCheckbox(index)}
                            checked={task.checkbox}
                            size='medium'
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            sx={{
                                color: blue[600],
                                '&.Mui-checked': {
                                color: blue[800],
                                },
                            }}
                        />
                        </ListItemIcon>
                        <ListItemText primary={task.text} secondary={task.date.toLocaleString()}/>
                        <IconButton edge='end' aria-label="edit" size="large" onClick={() => handleDialogOpen(task.text, index)}>
                            <EditIconCustom />
                        </IconButton>
                        <IconButton edge='end' aria-label="delete" size="large" onClick={() => onDelete(index)}>
                            <DeleteIconCustom />
                        </IconButton>
                    </ListItem>
                    ))}
                </List>
                )}
                <EditTodo
                open={isDialogOpen}
                task={currentTask}
                onClose={handleDialogClose}
                onSave={handleSaveTask}
                />
            </ListContainer>
                
        </>
      );
}

export default TodoList;