import React from 'react'
import styles from "./checkInModel.module.css"
import close from "../../../public/close.svg"
import Image from "next/image"
import checkCircle from "../../../public/check_circle.png"
import clubImg from "../../../public/Cifra Club - jpeg.png"



const CheckInModel = () => {
    return (
        <div className={styles.container}>
            <div className={styles.model_box}>
                <div className={styles.close}>
                    <Image src={close} />
                </div>
                <div className={styles.check_in_box}>
                    <div>
                        <Image src={checkCircle} />
                    </div>
                    <h2 className={styles.heading}>You’re checked in</h2>
                    <p>Thanks for supporting your local artist!</p>
                </div>
                <div className={styles.bg_image}>
                    <div className={styles.content_box}>
                        <div className={styles.club_image}>
                            <Image src={clubImg} alt="Cifra Club" />
                        </div>
                        <div>
                            <p>SAT 19 JUNE</p>
                            <h5 className={styles.heading_5}>Night Dance Competition</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckInModel