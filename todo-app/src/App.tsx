import { useEffect, useState } from "react";
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList';
import { ThemeProvider } from 'styled-components';
import { useThemeContext } from './components/Themes/ThemeContext';
import { lightTheme, darkTheme } from "./components/Themes/theme";
import GlobalStyle from './components/Themes/globalStyles';
import IconButton from '@mui/material/IconButton';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import { PaginationTodo } from './components/Pagination/Pagination';
import { fetchTodos, createTodo, deleteTodo, updateTodo } from "./api/todos";
import { useAppDispatch } from '../store/hooks';
import { addTask, deleteTask, setTasks, updateTask } from '../store/tasksSlice';
import { fetchTasks } from './../store/tasksThunks';
import './App.css'
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

    export interface TaskDate {
        id: number;
        text: string;
        createdAt: Date;
        completed: boolean;
    }

const App = () => {
    const dispatch = useAppDispatch();

    const { themeMode, toggleTheme } = useThemeContext();
    const theme = themeMode === 'light' ? lightTheme : darkTheme;
    const tasks = useSelector((state: RootState) => state.tasks.tasks)

    const [msgStateDelete, setMsgStateDelete] = useState<boolean>(false);
    const [errorMsgStateDelete, setErrorMsgStateDelete] = useState<boolean>(false);

    // Вывод массива tasks в консоль
    useEffect(() => {
        console.log('Tasks:', tasks); 
    }, [tasks]);

    // Получаем сохраненные задачи с помощью thunk
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch])

    const handleAddTask = async (taskText: string) => {
        try {
            const newTask = await createTodo(taskText);
            dispatch(addTask(newTask));
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
            setErrorMsgStateDelete(true);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTodo(id);
            dispatch(deleteTask(id));
            setMsgStateDelete(true);
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
            setErrorMsgStateDelete(true);
        }
    };

    const handleEditTask = async (id: number, newText: string) => {
        try {
            const updatedTask = await updateTodo(id, {text: newText});
            dispatch(updateTask(updatedTask));
            const data = await fetchTodos(1, 10);
            dispatch(setTasks(data.data)); 
        } catch (error) {
            console.error('Ошибка при изменении задачи', error)
            setErrorMsgStateDelete(true);
        }
    };

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
        ) => {
        if (reason === 'clickaway') {
          return;
        };
        setMsgStateDelete(false);
        setErrorMsgStateDelete(false);
        };

    return (
        <>
            {msgStateDelete 
                ?   <Snackbar open={msgStateDelete} autoHideDuration={2000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Задача успешно удалена.
                    </Alert>
                    </Snackbar>
                :   <Snackbar open={errorMsgStateDelete} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Сервер недоступен.
                    </Alert>
                    </Snackbar>
            }
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <IconButton onClick={toggleTheme} color="primary">
                    <ContrastOutlinedIcon />
                </IconButton>
                <AddTodo onAddTask={handleAddTask} />
                <TodoList onDelete={handleDeleteTask} onEdit={handleEditTask}/>
                <PaginationTodo />
            </ThemeProvider>
        </>
    );
};

export default App;