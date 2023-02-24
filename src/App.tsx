import React from 'react';
import styles from "./App.module.scss"
import {Field} from "./components/Field";
import {Background} from "./components/Background";
import {Menu} from "./components/Menu";
import {useAppSelector} from "./hooks/useRedux";
import {TableOfRecords} from "./components/TableOfRecords";

function App() {
    const {time, size, openTableWithResults} = useAppSelector(state => state.mineReducer);
    return (
        <div className={styles.App}>
            {openTableWithResults ? <Background children={<TableOfRecords/>}/> : time && size ?
                <Background children={<Field/>}/> :
                <Background children={<Menu/>}/>
            }

        </div>
    );
}

export default App;
