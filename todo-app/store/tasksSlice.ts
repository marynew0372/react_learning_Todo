import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTaskThunk, deleteTaskThunk, editTaskThunk, fetchTaskThunk, ToggleCompletedThunk } from './tasksThunks';

export interface Task {
    id: number;
    text: string;
    createdAt: Date;
    completed: boolean;
};

interface TaskState {
    tasks: Task[];
    errorLoadTasks: string | undefined;
    errorCreateTask: string | undefined;
    errorDeleteTask: boolean | undefined,
    successDeleteTask: boolean | undefined,
    sucessEditTask: boolean | undefined;
    successToggleCompletedTask: boolean | undefined;
};

const initialState: TaskState = {
    tasks: [],
    errorLoadTasks: undefined,
    errorCreateTask: undefined,
    errorDeleteTask: false,
    successDeleteTask: false,
    sucessEditTask: false,
    successToggleCompletedTask: false,
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
        clearDeleteErrorAlert(state) {
            state.errorDeleteTask = false;
            state.successDeleteTask = false;
        },
        clearEditAlert(state) {
            state.sucessEditTask = false;
        },
        clearToggleCompletedTaskAlert(state) {
            state.successToggleCompletedTask = false;
        },
    },
    extraReducers: (builder) => {
        //FETCH TASKS
        builder
        .addCase(fetchTaskThunk.fulfilled, (state, action) => {
            state.tasks = action.payload;
            state.errorLoadTasks = undefined;
        })
        .addCase(fetchTaskThunk.rejected, (state, action) => {
            state.errorLoadTasks = action.payload;
        })
        //CREATE TASK
        builder
        .addCase(addTaskThunk.fulfilled, (state, action) => {
            state.tasks.unshift(action.payload);
            state.errorCreateTask = undefined;
        })
        .addCase(addTaskThunk.rejected, (state, action) => {
            state.errorCreateTask = action.payload;
        })
        //DELETE TASK
        builder
        .addCase(deleteTaskThunk.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            state.errorDeleteTask = false;
            state.successDeleteTask = true;
        })
        .addCase(deleteTaskThunk.rejected, (state, action) => {
            state.errorDeleteTask = action.payload;
            state.successDeleteTask = false;
        })
        //EDIT TASK
        builder
        .addCase(editTaskThunk.fulfilled, (state, action) => {
            state.sucessEditTask = true;
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        })
        //TOGGLE TASK
        builder
        .addCase(ToggleCompletedThunk.fulfilled, (state, action) => { 
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task && task.completed === false) {
                state.successToggleCompletedTask = true;
            }
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        })
    }
});

export const { setTasks, addTask, deleteTask, clearDeleteErrorAlert, clearEditAlert, clearToggleCompletedTaskAlert } = tasksSlice.actions;
export default tasksSlice.reducer;
