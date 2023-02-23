import React from "react";
import styles from "./style/index.module.scss"

interface IBackground {
    children: React.ReactNode
}

export const Background = ({children}: IBackground) => {
    return (
        <section className={styles.section}>
            {
                Array.from(Array(160).keys())
                    .map((value, index) => <span className={styles.span} key={index}/>)
            }
            {children}
        </section>
    )
}