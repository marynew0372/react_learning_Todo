import { useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import EditTodo from '../EditTodo/EditTodo';
import { ListContainer, ButtonSort } from './TodoList.styles';
import { EditIconCustom, DeleteIconCustom, SwapVertIconCustom } from './TodoList.styles';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, updateTask } from '../../../store/tasksSlice';
import { RootState } from '../../../store/store';
import { toggleTask } from '../../api/todos';
import { format } from 'date-fns';
import './styles.css'


interface TodoListProps {
    onDelete: (index: number) => void;
    onEdit: (index: number, task: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({onDelete, onEdit}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [ascending, setAscending] = useState(true);
    const [msgStateCompleted, setMsgStateCompleted] = useState<boolean>(false);
    const [msgStateEdit, setMsgStateEdit] = useState<boolean>(false);

    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

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
            onEdit(currentIndex, newTask);
            setMsgStateEdit(true);
        }
    }

    const handleSortToggle = () => {
        setAscending(!ascending);
        sortTasksByDate(ascending);
    };

    const sortTasksByDate = (ascending: boolean = true) => {
        const sortedTasks = [...tasks].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return ascending
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        });
        console.log(sortedTasks);
        dispatch(setTasks(sortedTasks));
    };

    const handleToggleCheckbox = async (id: number) => {
        const updatedTask = await toggleTask(id);
        const task = tasks.find(t => t.id === id);
        if (task && task.completed === false) {
            setMsgStateCompleted(true);
        }
        dispatch(updateTask(updatedTask));
    }

    const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
    ) => {
    if (reason === 'clickaway') {
      return;
    };
    setMsgStateCompleted(false);
    setMsgStateEdit(false);
    };
    
    return (
        <> 
            {msgStateCompleted &&
                <Snackbar open={msgStateCompleted} autoHideDuration={2000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Задача выполнена.
                    </Alert>
                </Snackbar>
            }
            {msgStateEdit &&
                <Snackbar open={msgStateEdit} autoHideDuration={2000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Имя задачи изменено.
                    </Alert>
                </Snackbar>
            }
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
                            onChange={() => {
                                handleToggleCheckbox(task.id)
                            }}
                            checked={task.completed}
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
                        <ListItemText primary={task.text} secondary={format(new Date(task.createdAt), 'dd.MM.yyyy, HH:mm')}/>
                        <IconButton edge='end' aria-label="edit" size="large" onClick={() => handleDialogOpen(task.text, task.id)}>
                            <EditIconCustom />
                        </IconButton>
                        <IconButton edge='end' aria-label="delete" size="large" onClick={() => onDelete(task.id)}>
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