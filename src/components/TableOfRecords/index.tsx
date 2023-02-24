import styles from "./style/index.module.scss";
import {useAppDispatch} from "../../hooks/useRedux";
import {mineSlice} from "../../redux/reducers/mineReducer";
import {getPadTime} from "../Timer";
import React, {useState} from "react";

export const TableOfRecords = () => {
    const [time, setTime] = useState(localStorage.getItem('time'))
    const dispatch = useAppDispatch();
    const {setOpenTableWithResults} = mineSlice.actions
    const createTable = () => {
        if (time === null) {
            return <th/>;
        }
        try {
            JSON.parse(localStorage.getItem('time') as string).map((value: number, index: number) => {
                const min = getPadTime(Math.floor(value / 60));
                const sec = getPadTime(value - Math.floor(value / 60) * 60);
                return (
                    <>
                        <th key={index}>{index}</th>
                        <th key={index + 1}><span>{min}</span>
                            <span>:</span>
                            <span>{sec}</span></th>
                    </>
                )
            })
        } catch (e) {
            return <th/>;
        }
    }
    return (
        <div className={styles.container}>
            <button onClick={() => dispatch(setOpenTableWithResults())} className={styles.btn}>Menu</button>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {createTable()}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}