import { createSlice } from "@reduxjs/toolkit";
import { fetchTotalValueTaskThunk } from './tasksThunks';

interface Total {
    total: number
}

const initialState: Total = {
    total: 0,
}

const totalSlice = createSlice({
    name: 'total',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTotalValueTaskThunk.fulfilled, (state, action) => {
            state.total = action.payload;
        })
    }
})

export default totalSlice.reducer;