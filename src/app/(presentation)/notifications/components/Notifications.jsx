import React from 'react'
import styles from "./notifications.module.css"
import Sidebar from '../../shared/sidebar/Sidebar'
import Image from 'next/image'
import watar from "../../../../../public/Water.svg"
import dots from "../../../../../public/dots.svg"

const Notifications = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mid_section}>
                <div className={styles.title}>
                    <p>Notification</p>
                </div>

                <div className={styles.notification_container}>
                    <div className={styles.notification_box}>
                        <div className={styles.left_col}>
                            <Image src={watar} />
                        </div>
                        <div className={styles.right_col}>
                            <div>
                                <p className='p_small_regular'>Three of your favourite artist are playing live in your area!</p>
                                <span className='p_x_regular'>2 hours</span>
                            </div>

                            <div className={styles.dots}>
                                <Image src={dots} className={styles.dotsImage} width={25} height={25} />
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Notifications