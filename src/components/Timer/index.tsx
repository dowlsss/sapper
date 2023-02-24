import React, {useState, useEffect} from "react";
import {useAppSelector} from "../../hooks/useRedux";
import {mineSlice} from "../../redux/reducers/mineReducer";

export const getPadTime = (time: number) => time.toString().padStart(2, '0');

const Timer: React.FC<{ timeCount: number, reset: boolean, setReset: (reset: boolean) => void }> = ({
                                                                                                        timeCount,
                                                                                                        setReset,
                                                                                                        reset
                                                                                                    }) => {
    const [time, setTime_] = useState(timeCount * 60);
    const [isCounting, setCounting] = useState(true);
    const min = getPadTime(Math.floor(time / 60));
    const sec = getPadTime(time - Math.floor(time / 60) * 60);
    const {win, loose} = useAppSelector(state => state.mineReducer);
    const {setLoose, setTime} = mineSlice.actions
    useEffect(() => {
        if (!win && !loose) {
            const interval = setInterval(() => {
                isCounting && setTime_(time >= 1 ? time - 1 : 0)
            }, 1000)
            if (time === 0) {
                setCounting(false);
                setLoose(true);
            }
            return () => {
                clearInterval(interval)
            }
        }
    }, [time, win, loose, isCounting, setLoose]);
    useEffect(() => {
        if (win) {
            if (localStorage.getItem('time') !== null) {
                const time_: number[] = JSON.parse(localStorage.getItem('time') as string);
                time_.push(time)
                localStorage.setItem('time', JSON.stringify(time_))
            } else {
                localStorage.setItem('time', JSON.stringify([time]))
            }
        }
    }, [setTime, time, win])
    useEffect(() => {
        if (reset) {
            setTime_(timeCount * 60);
            setReset(false);
        }
    }, [reset])

    return (
        <div>
            <span>{min}</span>
            <span>:</span>
            <span>{sec}</span>
        </div>
    )
};

export default Timer;