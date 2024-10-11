import React from 'react'
import styles from "./profile.module.css"
import Sidebar from "../../components/sidebar/Sidebar"
import ProfileImage from "../../../public/profile-screen.svg"
import Image from 'next/image'
import rightChev from "../../../public/chevron_right.svg"
import Link from "next/link"
import { useSession } from 'next-auth/react'

const ProfileScreen = () => {
    const { data: session } = useSession()


    return (
        <>
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.mid_section}>
                    <div className={styles.profileCard}>
                        <div className={styles.person}>
                            <Image src={session?.user?.image ? session.user.image : ProfileImage} width={120} height={120} />
                        </div>
                        <div className={styles.personInfo}>
                            {session?.user ? (
                                <div>
                                    <h3>{session?.user?.name}</h3>
                                    <p>{session?.user?.name}</p>
                                </div>
                            ) : (
                                <p>loading...</p>
                            )}
                        </div>
                        <Link href="/edit-profile">
                            <div className={styles.btn_box}>
                                <button>Edit profile</button>
                            </div>
                        </Link>
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
            </div >

        </>
    )
}

export default ProfileScreen