import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTaskThunk, deleteTaskThunk, editTaskThunk, fetchTaskThunk } from './tasksThunks';

export interface Task {
    id: number;
    text: string;
    createdAt: Date;
    completed: boolean;
};

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | undefined;
};

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: 'null',
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.unshift(action.payload);
        },
        deleteTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        fetchTasksStart(state) {
            state.loading = true;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        //FETCH TASKS
        builder
        .addCase(fetchTaskThunk.fulfilled, (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
        })
        .addCase(fetchTaskThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        //CREATE TASK
        builder
        .addCase(addTaskThunk.fulfilled, (state, action) => {
            state.tasks.unshift(action.payload);
        })
        //DELETE TASK
        .addCase(deleteTaskThunk.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        })
        //EDIT TASK
        .addCase(editTaskThunk.fulfilled, (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        })
    }
});

export const { setTasks, addTask, deleteTask, updateTask, fetchTasksStart } = tasksSlice.actions;
export default tasksSlice.reducer;
