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
import { useAppDispatch } from '../store/hooks';
import { fetchTaskThunk, addTaskThunk, deleteTaskThunk, editTaskThunk } from './../store/tasksThunks';
import './App.css'

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

    const [msgStateDelete, setMsgStateDelete] = useState<boolean>(false);
    const [errorMsgStateDelete, setErrorMsgStateDelete] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchTaskThunk({page: 1, limit: 10}));
    }, [dispatch])

    const handleAddTask = async (taskText: string) => {
        dispatch(addTaskThunk({taskText}));
        setErrorMsgStateDelete(true);
    };

    const handleDeleteTask = async (id: number) => {
        dispatch(deleteTaskThunk({id}));
        setMsgStateDelete(true);
        setErrorMsgStateDelete(true);
    };

    const handleEditTask = async (id: number, newText: string) => {
        dispatch(editTaskThunk({id, newText}))
        setErrorMsgStateDelete(true);
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