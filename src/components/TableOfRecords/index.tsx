import styles from "./style/index.module.scss";
import {useAppDispatch} from "../../hooks/useRedux";
import {mineSlice} from "../../redux/reducers/mineReducer";
import {getPadTime} from "../Timer";
import React from "react";

export const TableOfRecords = () => {
    const dispatch = useAppDispatch();
    const {setOpenTableWithResults} = mineSlice.actions
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
                        {JSON.parse(localStorage.getItem('time') as string).map((value: number, index: number) => {
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
                        })}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}