import React from 'react';
import styles from "./App.module.scss"
import {Field} from "./components/Field";
import {Background} from "./components/Background";
import {Menu} from "./components/Menu";
import {useAppSelector} from "./hooks/useRedux";

function App() {
    const {time, size} = useAppSelector(state => state.mineReducer);
    return (
        <div className={styles.App}>
            {time && size ?
                <Background children={<Field/>}/> :
                <Background children={<Menu/>}/>
            }
        </div>
    );
}

export default App;
