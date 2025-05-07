import { useEffect, useState } from "react";
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList';
import { ThemeProvider } from 'styled-components';
import { useThemeContext } from './components/Themes/ThemeContext';
import { lightTheme, darkTheme } from "./components/Themes/theme";
import GlobalStyle from './components/Themes/globalStyles';
import IconButton from '@mui/material/IconButton';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from "./utils/localStorage";
import './App.css'

    export interface TaskDate {
        text: string;
        date: Date;
        checkbox: boolean;
    }

const App = () => {
    const [tasks, setTasks] = useState<TaskDate[]>([]);

    const { themeMode, toggleTheme } = useThemeContext();
    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    // Вывод массива tasks в консоль
    useEffect(() => {
        console.log('Tasks:', tasks); 
    }, [tasks]);

    //Получаем сохраненные задачи из localstorage
    useEffect(() => {
        const storedTasks = loadTasksFromLocalStorage();
        setTasks(storedTasks);
    }, []);

    const handleAddTask = (taskText: string) => {
        const newTask: TaskDate = { text: taskText, date: new Date(), checkbox: false };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    const handleDeleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index )
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    const handleEditTask = (index: number, newTask: string) => {
        if (newTask.trim()) {
            const updatedTasks = [...tasks];
            updatedTasks[index] = { ...updatedTasks[index], text: newTask, date: new Date() };
            setTasks(updatedTasks);
            saveTasksToLocalStorage(updatedTasks)
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <IconButton onClick={toggleTheme} color="primary">
                    <ContrastOutlinedIcon />
                </IconButton>
                <AddTodo onAddTask={handleAddTask} />
                <TodoList tasks={tasks} setTasks={setTasks} onDelete={handleDeleteTask} onEdit={handleEditTask}/>
            </ThemeProvider>
        </>
    );
};

export default App;