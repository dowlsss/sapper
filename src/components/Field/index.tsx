import React, {useEffect, useState} from "react";
import styles from "./styles/index.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {mineSlice} from "../../redux/reducers/mineReducer";
import Timer from "../Timer";

const createField = (width: number, height: number) => {
    const field: number[] = new Array(width * height).fill(0);

    function inc(x: number, y: number) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            if (field[y * width + x] === -1) return;

            field[y * width + x] += 1;
        }
    }

    for (let i = 0; i < width;) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        if (field[y * width + x] === -1) continue;

        field[y * width + x] = -1;

        i += 1;

        inc(x + 1, y);
        inc(x - 1, y);
        inc(x, y + 1);
        inc(x, y - 1);
        inc(x + 1, y - 1);
        inc(x - 1, y - 1);
        inc(x + 1, y + 1);
        inc(x - 1, y + 1);
    }

    return field;
}

function getFontColor(value: number) {
    switch (value) {
        case (1):
            return {color: '#6495ED'}
        case (2):
            return {color: '#37b22b'}
        case (3):
            return {color: '#f38181'}
        case (4):
            return {color: '#3f72af'}
        case (5):
            return {color: '#d4a5a5'}
        case (6):
            return {color: '#00e0ff'}
        case (7):
            return {color: '#384259'}
        default:
            return {color: '#6495ED'}
    }
}


export const Field = () => {
    const [width, height] = useAppSelector(state => state.mineReducer.size);
    const {opened, win, loose, time} = useAppSelector(state => state.mineReducer);
    const {setOpened, createOpened, setWin, setLoose, setTime, setSize} = mineSlice.actions;
    const dispatch = useAppDispatch();
    const [reset, setReset] = useState(false);
    const [field, setField] = useState<number[]>(createField(width, height));
    const [flag, setFlag] = useState([...new Array(width * height).fill('')]);


    const clickHandler = (e: any, index: number) => {
        e.stopPropagation()
        if (opened[index] === 1 || win || loose) {
            return;
        }

        if (field[index] === -1) {
            dispatch(setLoose(true));
        }
        let cellContainer: [number, number][] = [];
        const flag_ = [...flag];
        const opened_ = [...opened];
        const addCell = (x: number, y: number) => {
            if (field[y * width + x] !== 0) {
                if (field[y * width + x] !== -1) {
                    opened_[y * width + x] = 1;
                    flag_[y * width + x] = ''
                }
                return;
            }
            cellContainer.push([x, y])


        }
        const isChecked = (cellIndex: number) => {
            return !!opened_[cellIndex]
        }

        const isValid = (x: number, y: number) => {
            return x >= 0 && x < width && y >= 0 && y < height
        }
        addCell(index % width, Math.floor(index / width))
        while (cellContainer.length) {
            const [x, y] = cellContainer.shift()!
            if (!isChecked(y * width + x)) {
                opened_[y * width + x] = 1;
                flag_[y * width + x] = ''
            }
            if (!isChecked(y * width + x + 1) && isValid(x + 1, y)) {
                addCell(x + 1, y);
            }
            if (!isChecked(y * width + x - 1) && isValid(x - 1, y)) {
                addCell(x - 1, y);
            }
            if (!isChecked((y + 1) * width + x) && isValid(x, y + 1)) {
                addCell(x, y + 1);
            }
            if (!isChecked((y - 1) * width + x) && isValid(x, y - 1)) {
                addCell(x, y - 1);
            }
        }
        opened_.map((_, index) => dispatch(setOpened({index, value: _})))
        setFlag(flag_);

    }

    const onContextMenuHandler = (e: any, index: number) => {
        e.stopPropagation();
        if (opened[index] || win || loose) {
            return;
        }
        if (!flag[index]) {
            setFlag(flag.map((value, index1) => index1 === index ? '🚩' : value));
        } else if (flag[index] === '🚩') {
            setFlag(flag.map((value, index1) => index1 === index ? '❓' : value));
        } else {
            setFlag(flag.map((value, index1) => index1 === index ? '' : value));
        }
    }

    const resetHandler = () => {
        setField(createField(width, height));
        setFlag(flag.map((_) => ''));
        dispatch(createOpened([width, height]));
        dispatch(setWin(false));
        dispatch(setLoose(false));
        setReset(true);
    }

    const menuHandler = () => {
        dispatch(createOpened([0, 0]));
        dispatch(setSize([0, 0]));
        dispatch(setTime(0));
        dispatch(setLoose(false));
        dispatch(setWin(false));
    }

    useEffect(() => {
        if ((((opened.filter((value) => value === 1).length + flag.filter((value => value === '🚩')).length) === field.length) || ((opened.filter((value) => value === 1).length + field.filter(value => value === -1).length) === field.length)) && !loose) {
            dispatch(setWin(true));
            alert('Congratulations on your victory, your result will be recorded in the table!');
        }
    }, [opened, flag])

    useEffect(() => {
        if (loose) {
            alert('You\'ve lost, you can try again')
            opened.map((_, index) => dispatch(setOpened({index, value: 1})));
            setFlag([...new Array(width * height).fill('')]);
        }
    }, [loose]);
    return (
        <div className={styles.field}>
            <div className={styles.infoGroup}>
                <div className={styles.timeContainer}>
                    <span>Time - </span>
                    <Timer reset={reset} setReset={setReset} timeCount={time}/>
                </div>
                <div className={styles.btnGroup}>
                    <button onClick={resetHandler}>Reset</button>
                    <button onClick={menuHandler}>Menu</button>
                </div>
                <div>
                    <span>💣 - </span>
                    {field.filter((value => value === -1)).length - flag.filter((value => value === '🚩')).length}
                </div>
            </div>
            <div className={styles.fieldContainer}
                 style={{
                     gridTemplateColumns: `repeat(${width}, calc((80vw - (0.625vw * ${width})) / ${width})`,
                     gridTemplateRows: `repeat(${height}, calc(70vh / ${width})`
                 }}>
                {
                    field.map(((value, index) => {
                        return (
                            <div style={getFontColor(field[index])}
                                 onContextMenu={(e) => onContextMenuHandler(e, index)}
                                 onClick={(e) => clickHandler(e, index)} key={index}
                                 className={styles.cell}>
                                {
                                    flag[index] && !opened[index] ? flag[index] :
                                        opened[index] ? field[index] > 0 ? value : field[index] === 0 ? '✔' : '💣' : null
                                }
                            </div>
                        )
                    }))
                }

            </div>
        </div>
    )
}