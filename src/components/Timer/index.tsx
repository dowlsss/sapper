import React, {useState, useEffect} from "react";

const getPadTime = (time: number) => time.toString().padStart(2, '0');

const Timer: React.FC<{ timeCount: number }> = ({timeCount}) => {
    const [time, setTime] = useState(timeCount * 60);
    const [isCounting, setCounting] = useState(true);
    const min = getPadTime(Math.floor(time / 60));
    const sec = getPadTime(time - Math.floor(time / 60) * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            isCounting && setTime(time >= 1 ? time - 1 : 0)
        }, 1000)
        if (time === 0) {
            setCounting(false);
        }
        return () => {
            clearInterval(interval)
        }
    }, [time]);

    return (
        <div>
            <span>{min}</span>
            <span>:</span>
            <span>{sec}</span>
        </div>
    )
};

export default Timer;