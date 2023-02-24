import styles from "./style/index.module.scss";
import {useAppDispatch} from "../../hooks/useRedux";
import {mineSlice} from "../../redux/reducers/mineReducer";

export const Menu = () => {
    const dispatch = useAppDispatch();
    const {setSize, createOpened, setTime, setOpenTableWithResults} = mineSlice.actions;

    const easyHandler = () => {
        dispatch(createOpened([8, 8]));
        dispatch(setSize([8, 8]));
        dispatch(setTime(10));
    }

    const mediumHandler = () => {
        dispatch(createOpened([16, 16]));
        dispatch(setSize([16, 16]));
        dispatch(setTime(40));
    }
    const hardHandler = () => {
        dispatch(createOpened([32, 16]));
        dispatch(setSize([32, 16]));
        dispatch(setTime(100));
    }

    const resultsHandler = () => {
        dispatch(setOpenTableWithResults())
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <h3>Easy</h3>
                        <p>A simple level with an 8x8 field. You will have as much as 10 minutes. Good luck!</p>
                        <button onClick={easyHandler}>Go</button>
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <h3>Medium</h3>
                        <p>It's already more difficult, but you can handle a 16x16 field and 40 minutes.</p>
                        <button onClick={mediumHandler}>Go</button>
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <h3>Hard</h3>
                        <p>Are you sure you can handle it? As much as 100 minutes and a field of 32x16</p>
                        <button onClick={hardHandler}>Go</button>
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <h3>Tables of records</h3>
                        <p>Find out your best score</p>
                        <button onClick={resultsHandler}>Go</button>
                    </div>
                </div>
            </div>
        </div>
    )
}