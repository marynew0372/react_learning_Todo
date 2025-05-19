import { useEffect } from "react";
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
import { useAppDispatch } from '../store/hooks';
import { fetchTaskThunk, addTaskThunk, deleteTaskThunk, editTaskThunk } from './../store/tasksThunks';
import './App.css'
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearDeleteErrorAlert } from "../store/tasksSlice";

export interface TaskDate {
    id: number;
    text: string;
    createdAt: Date;
    completed: boolean;
}

const App = () => {
    const dispatch = useAppDispatch();

    const { themeMode, toggleTheme } = useThemeContext();
    const theme = themeMode === 'light' ? lightTheme : darkTheme

    const successDeleteTask = useSelector((state: RootState) => state.tasks.successDeleteTask);
    const errorDeleteTask = useSelector((state: RootState) => state.tasks.errorDeleteTask);
    
    useEffect(() => {
        dispatch(fetchTaskThunk({page: 1, limit: 10}));
    }, [dispatch]);
    
    const handleAddTask = (taskText: string) => {
        dispatch(addTaskThunk({taskText}));
    };
    
    const handleDeleteTask = (id: number) => {
        dispatch(deleteTaskThunk({id}));
    };

    const handleEditTask = (id: number, newText: string) => {
        dispatch(editTaskThunk({id, newText}));
    };

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
        ) => {
        if (reason === 'clickaway') {
          return;
        };
        dispatch(clearDeleteErrorAlert());
        };

    return (
        <>
            {successDeleteTask && (
                <Snackbar open={successDeleteTask} autoHideDuration={2000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Задача успешно удалена.
                    </Alert>
                </Snackbar>
            )}
            {errorDeleteTask && (
                <Snackbar open={errorDeleteTask} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Возникла ошибка при удалении задачи.
                    </Alert>
                </Snackbar>
            )}
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