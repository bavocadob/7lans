import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 4
}

const chooseGame = createSlice({
    name: 'choosegame',
    initialState,
    reducers: {
        changeGame: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {changeGame} = chooseGame.actions
export default chooseGame.reducer