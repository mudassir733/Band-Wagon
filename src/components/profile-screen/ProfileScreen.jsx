import React from 'react'
import styles from "./profile.module.css"
import Sidebar from "../../components/sidebar/Sidebar"
import profile from "../../../public/profile-screen.svg"
import Image from 'next/image'
import rightChev from "../../../public/chevron_right.svg"


const ProfileScreen = () => {
    return (
        <>
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.mid_section}>
                    <div className={styles.profileCard}>
                        <div className={styles.person}>
                            <Image src={profile} />
                        </div>
                        <div className={styles.personInfo}>
                            <h3>Andy Warhool</h3>
                            <p>@andywarhool234</p>
                        </div>
                        <div className={styles.btn_box}>
                            <button>Edit profile</button>
                        </div>
                    </div>
                    <div className={styles.cardShow_container}>
                        <div className={styles.cardNextShow}>
                            <div className={styles.left}>
                                <p>View saved & hidden artists</p>
                            </div>
                            <div className={styles.right}>
                                <Image src={rightChev} />
                            </div>

                        </div>
                    </div>
                    <div className={styles.cardShow_container}>
                        <div className={styles.cardNextShow}>
                            <div className={styles.left}>
                                <p>Artist page management</p>
                            </div>
                            <div className={styles.right}>
                                <Image src={rightChev} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfileScreen