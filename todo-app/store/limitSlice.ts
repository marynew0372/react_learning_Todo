import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LimitState {
    limit: number;
}

const initialState: LimitState = {
    limit: 10,
}

const limitSlice = createSlice({
    name: 'limit',
    initialState,
    reducers: {
        saveLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        loadLimit(state) {
            state.limit;
        }
    }
})

export const { saveLimit, loadLimit } = limitSlice.actions;
export default limitSlice.reducer;