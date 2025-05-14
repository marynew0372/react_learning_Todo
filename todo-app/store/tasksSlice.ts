import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
    id: number;
    text: string;
    createdAt: Date;
    completed: boolean;
};

interface TaskState {
    tasks: Task[];
};

const initialState: TaskState = {
    tasks: [],
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
    },
});

export const { setTasks, addTask, deleteTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
