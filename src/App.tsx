import React from 'react';
import styles from "./App.module.scss"
import {Field} from "./components/Field";
import {useAppDispatch} from "./hooks/useRedux";
import {mineSlice} from "./redux/reducers/mineReducer";

function App() {
    const dispatch = useAppDispatch();
    const {setSize, createOpened} = mineSlice.actions;
    dispatch(createOpened([16, 16]))
    dispatch(setSize([16, 16]))
    return (
        <div className={styles.App}>
            <Field timeToGame={10}/>
        </div>
    );
}

export default App;
