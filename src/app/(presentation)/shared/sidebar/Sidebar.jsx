import React, { useState, useEffect } from 'react'
import styles from "./sidebar.module.css"
import Image from "next/image"
import { IoLocationOutline } from "react-icons/io5";
import move from "../../../../../public/images/move_item.svg"
import chevron from "../../../../../public/images/chevron_right.svg"
import chevronLeft from "../../../../../public/images/chevron_left.svg"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaRegUser } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import LogoutModel from '../logout-model/LogoutModel';
import { GiGuitarHead } from "react-icons/gi";




const Sidebar = ({ role }) => {

    const pathname = usePathname()

    const [open, setOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleOpen = () => {
        setOpen(prev => !prev);
    }



    return (

        <>
            <div className={styles.container}>
                {!open ? (
                    <main className={styles.sidebar}>

                        <div className={styles.flex}>

                            <Link href="/">
                                <div className={pathname === "/" ? styles.active_bg : ""}>
                                    <IoLocationOutline size={20} />
                                </div>
                            </Link>


                            <Link href="/profile-screen">
                                <div className={pathname === "/profile-screen" ? styles.active_bg : ""}>
                                    <FaRegUser size={18} color={pathname !== "/profile-screen" ? "#fff" : ""} />
                                </div>
                            </Link>
                            <Link href="/notifications">
                                <div className={pathname === "/notifications" ? styles.active_bg : ""}>
                                    <IoNotificationsOutline size={20} color={pathname !== "/notifications" ? "#fff" : ""} />
                                </div>
                            </Link>

                        </div>
                        <div className={styles.row}>

                            <div className={pathname === "/setting" ? styles.active_bg : ""}>
                                <IoSettingsSharp size={20} color={pathname !== "/setting" ? "#fff" : ""} />
                            </div>

                            {role === "artist" && (
                                <Link href="/create-shows">
                                    <GiGuitarHead size={20} color={pathname !== "/create-shows" ? "#fff" : ""} />
                                </Link>
                            )}
                            <div className={styles.move} onClick={openModal}>
                                <Image src={move} />
                            </div>


                        </div>
                        <div onClick={handleOpen} className={styles.rightChev}>
                            <Image src={chevron} />
                        </div>


                    </main >
                ) : (

                    <div className={`${open ? styles.subSidebar : styles.close} ${open ? styles.position : ""}`}>
                        <div className={styles.flex}>
                            <div className={styles.subRow}>
                                <IoLocationOutline size={20} className={pathname === "/" ? styles.active : ""} />
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
                                    <IoSettingsSharp className={pathname === "/setting" ? styles.active : ""} size={20} />
                                    <p className={pathname === "/setting" ? styles.active : ""}>Setting</p>
                                </div>
                            </Link>

                            {role === "artist" && (
                                <Link href="/create-shows">
                                    <div className={styles.subRow}>
                                        <GiGuitarHead size={20} color={pathname !== "/create-shows" ? "#fff" : ""} />
                                        <p className={pathname === "/create-shows" ? styles.active : ""}>Shows</p>
                                    </div>
                                </Link>
                            )}
                            <div className={styles.subRow} onClick={openModal}>
                                <Image src={move} />
                                <p>Log out</p>
                            </div>


                        </div>
                        <div className={styles.leftChev} onClick={handleOpen}>
                            <Image src={chevronLeft} />
                        </div>
                    </div>

                )}
            </div >
            <LogoutModel isOpen={isModalOpen} onClose={closeModal} />
        </>
    )
}

export default Sidebar