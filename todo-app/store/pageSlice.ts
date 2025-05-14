import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
    page: number;
}

const initialState: PageState = {
    page: 1,
}

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        savePage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        loadPage(state) {
            state.page;
        }
    }
})

export const { savePage, loadPage } = pageSlice.actions;
export default pageSlice.reducer;
