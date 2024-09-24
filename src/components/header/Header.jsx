import React from 'react'
import styles from "./Header.module.css"
import Image from "next/image"
import ellipse from '../../../public/images/Ellipse 190.svg'
import bandwogan from '../../../public/images/BandWagon.svg'
import search from "../../../public/images/search.svg"
import profile from "../../../public/images/Profile.svg"
import Link from "next/link"


const Header = () => {
    return (
        <header className={styles.header}>
            <div>
                <Link href="/" className={styles.group}>
                    <div className="ellipse">

                        <Image src={ellipse} alt='ellipse icon' />

                    </div>
                    <div className="bandwogan">
                        <Image src={bandwogan} alt='Band wogan logo' />
                    </div>
                </Link>

            </div>
            <nav className={styles.nav}>
                <div className={styles.navbar}>
                    <div className={styles.search_icon}>
                        <Image src={search} alt='search icon' />
                    </div>
                    <div className={styles.search_bar}>
                        <input type="text" placeholder='Search for Artist, VEnues, or Addresses' />
                    </div>
                </div>
            </nav>
            <div className={styles.profile}>
                <Image src={profile} alt='User Profile' />
            </div>
        </header>
    )
}

export default Header