import React, { useState } from 'react'
import styles from "./sidebar.module.css"
import Image from "next/image"
import locationImg from "../../../../../public/images/location_on.svg"
import notification from "../../../../../public/images/notifications.svg"
import person1 from "../../../../../public/images/person1.svg"
import setting from "../../../../../public/images/settings.svg"
import move from "../../../../../public/images/move_item.svg"
import chevron from "../../../../../public/images/chevron_right.svg"
import chevronLeft from "../../../../../public/images/chevron_left.svg"
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CiLocationOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";




const Sidebar = () => {
    const pathname = usePathname()

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }
    return (

        <div className={styles.container}>
            <main className={styles.sidebar}>
                <div className={styles.flex}>

                    <Link href="/">
                        <div className={pathname === "/" ? styles.active_bg : ""}>
                            <Image src={locationImg} alt="location img" />
                        </div>
                    </Link>


                    <Link href="/profile-screen">
                        <div className={pathname === "/profile-screen" ? styles.active_bg : ""}>
                            <Image src={person1} />
                        </div>
                    </Link>
                    <Link href="/notifications">
                        <div className={pathname === "/notifications" ? styles.active_bg : ""}>
                            <Image src={notification} />
                        </div>
                    </Link>

                </div>
                <div className={styles.row}>
                    <Link href="/setting">
                        <div className={pathname === "/setting" ? styles.active_bg : ""}>
                            <Image src={setting} />
                        </div>
                    </Link>
                    <div className={styles.move} onClick={() => signOut({ callbackUrl: "/onboarding" })}>
                        <Image src={move} />
                    </div>

                </div>
                <div onClick={handleOpen} className={styles.rightChev}>
                    <Image src={chevron} />
                </div>
                <div className={`${open ? styles.subSidebar : styles.close}`}>
                    <div className={styles.flex}>
                        <div className={styles.subRow}>
                            <CiLocationOn size={23} className={pathname === "/" ? styles.active : ""} />
                            <p className={pathname === "/" ? styles.explore : ""}>Explore</p>
                        </div>
                        <Link href="/profile-screen">
                            <div className={styles.subRow}>
                                <FaRegUser size={18} className={pathname === "/profile-screen" ? styles.active : ""} />
                                <p className={pathname === "/profile-screen" ? styles.active : ""}>Profile</p>
                            </div>
                        </Link>
                        <Link href="/notifications">
                            <div className={styles.subRow}>
                                <IoNotificationsOutline size={20} className={pathname === "/notifications" ? styles.active : ""} />
                                <p className={pathname === "/notifications" ? styles.active : ""}>Notification</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.row}>
                        <Link href="/setting">
                            <div className={styles.subRow}>
                                <IoSettingsSharp className={pathname === "/setting" ? styles.active : ""} />
                                <p className={pathname === "/setting" ? styles.active : ""}>Setting</p>
                            </div>
                        </Link>
                        <div className={styles.subRow} onClick={() => signOut({ callbackUrl: "/onboarding" })}>
                            <Image src={move} />
                            <p>Log out</p>
                        </div>


                    </div>
                    <div className={styles.leftChev} onClick={handleOpen}>
                        <Image src={chevronLeft} />
                    </div>
                </div>

            </main >

        </div >
    )
}

export default Sidebar