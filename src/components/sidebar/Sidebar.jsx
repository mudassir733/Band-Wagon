import React, { useState } from 'react'
import styles from "./sidebar.module.css"
import Image from "next/image"
import locationImg from "../../../public/images/location_on.svg"
import notification from "../../../public/images/notifications.svg"
import person1 from "../../../public/images/person1.svg"
import setting from "../../../public/images/settings.svg"
import move from "../../../public/images/move_item.svg"
import chevron from "../../../public/images/chevron_right.svg"
import chevronLeft from "../../../public/images/chevron_left.svg"




const Sidebar = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }
    return (

        <div className={styles.container}>
            <main className={styles.sidebar}>
                <div className={styles.flex}>
                    <div className={styles.location}>
                        <Image src={locationImg} alt="location img" />
                    </div>
                    <div className={styles.person}>
                        <Image src={person1} />
                    </div>
                    <div className={styles.notification}>
                        <Image src={notification} />
                    </div>

                </div>
                <div className={styles.row}>
                    <div className={styles.setting}>
                        <Image src={setting} />
                    </div>
                    <div className={styles.move}>
                        <Image src={move} />
                    </div>

                </div>
                <div onClick={handleOpen} className={styles.rightChev}>
                    <Image src={chevron} />
                </div>
                <div className={`${open ? styles.subSidebar : styles.close}`}>
                    <div className={styles.flex}>
                        <div className={styles.subRow}>
                            <Image src={locationImg} alt="location img" />
                            <p className={styles.explore}>Explore</p>
                        </div>
                        <div className={styles.subRow}>
                            <Image src={person1} />
                            <p>Profile</p>
                        </div>
                        <div className={styles.subRow}>
                            <Image src={notification} />
                            <p>Notification</p>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.subRow}>
                            <Image src={setting} />
                            <p>Setting</p>
                        </div>
                        <div className={styles.subRow}>
                            <Image src={move} />
                            <p>Log out</p>
                        </div>


                    </div>
                    <div className={styles.leftChev} onClick={handleOpen}>
                        <Image src={chevronLeft} />
                    </div>
                </div>

            </main>


        </div>
    )
}

export default Sidebar