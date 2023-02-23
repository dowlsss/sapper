import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    opened: number[]
    loose: boolean
    win: boolean
    time: number
    size: [number, number]
}

const initialState: IInitialState = {
    opened: [],
    win: false,
    loose: false,
    time: 0,
    size: [0, 0]

}


export const mineSlice = createSlice({
    name: 'mineSlice',
    initialState: initialState,
    reducers: {
        setTime(state: IInitialState, action: PayloadAction<number>) {
            state.time = action.payload;
        },
        setWin(state: IInitialState, action: PayloadAction<boolean>) {
            state.win = action.payload;
        },
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