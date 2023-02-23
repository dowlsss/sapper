import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    opened: number[]
    loose: boolean
    size: [number, number]
}

const initialState: IInitialState = {
    opened: [],
    loose: false,
    size: [0, 0]

}


export const mineSlice = createSlice({
    name: 'mineSlice',
    initialState: initialState,
    reducers: {
        setLoose(state: IInitialState, action: PayloadAction<boolean>) {
            state.loose = action.payload;
        },
        createOpened(state: IInitialState, action: PayloadAction<[number, number]>) {
            state.opened = [...new Array(action.payload[0] * action.payload[1]).fill(0)]
        },
        setOpened(state: IInitialState, action: PayloadAction<{ index: number, value: number }>) {
            state.opened[action.payload.index] = action.payload.value;
        },
        setSize(state: IInitialState, action: PayloadAction<[number, number]>) {
            state.size = action.payload;
        }
    }

})

export default mineSlice.reducer;