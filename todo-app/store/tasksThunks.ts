import { createTodo, deleteTodo, fetchTodos, updateTodo } from '../src/api/todos';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from './tasksSlice';




export const fetchTotalValueTaskThunk = createAsyncThunk(
    'tasks/total',
    async ({page = 1, limit = 10}: {page: number, limit: number}) => {
        try {
            const response = await fetchTodos(page, limit);
            const total = response.total
            return total;
        } catch (error) {
            console.error(error);
        }
    }
)

export const fetchTaskThunk = createAsyncThunk<
    Task[],
    { page: number, limit: number },
    { rejectValue: string }
>(
    'tasks/fetchTasks',
    async ({page = 1, limit = 10}, thunkAPI) => {
        try {
            const response = await fetchTodos(page, limit);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Не удалось загрузить задачи');
        }
    }
)

export const addTaskThunk = createAsyncThunk<
    Task,
    { taskText: string },
    { rejectValue: string }
>(
    'tasks/addTask',
    async ({taskText}) => {
        try {
            const newTask = await createTodo(taskText);
            return newTask;
        } catch (error) {
            console.error ('Эта ошибка из санка addTaskThunk', error);
            // return thunkAPI.rejectWithValue('Не удалось загрузить задачи');
        }
    }
)

export const deleteTaskThunk = createAsyncThunk(
    'tasks/deleteTask',
    async ({id}: {id: number}) => {
        try {
            await deleteTodo(id);
            return id;
        } catch (error) {
            console.error(error);
        }
    }
)

export const editTaskThunk = createAsyncThunk(
    'tasks/editTask',
    async ({id, newText}: {id: number, newText: string}) => {
        const updatedTask = await updateTodo(id, {text: newText});
        return updatedTask;
    }
)