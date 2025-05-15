import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
    id: number;
    text: string;
    createdAt: Date;
    completed: boolean;
};

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
};

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
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
            state.error = null;
        }
    },
});

export const { setTasks, addTask, deleteTask, updateTask, fetchTasksStart } = tasksSlice.actions;
export default tasksSlice.reducer;
