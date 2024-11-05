"use client"
import React from 'react'
import Image from "next/image"
import styles from "./artistSidebar.module.css"
import verify from "../../../../../public/new_releases.svg"
import Button from "../buttons/Button"
import andy from ".../../../../../public/andy.svg"
import calender from "../../../../../public/calendar_month.svg"
import time from "../../../../../public/time.svg"
import location from "../../../../../public/location_on.svg"
import genre from "../../../../../public/genres.svg"
import MapComponent from '../map/MapComponent'




const ArtistSidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.artistSidebar}>
                <div className={styles.flexSidebar}>
                    <article className={styles.artistFlex}>
                        <div className={styles.profile}>
                            <Image src={andy} width={50} height={50} />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.verified}>
                                <p>Andy Warhool</p>
                                <Image src={verify} />
                            </div>
                            <p>Artist</p>
                        </div>

                        <div className={styles.button}>
                            <Button label="View Profile" variant="outlined" />
                        </div>
                    </article>
                    <div className={styles.divider}></div>
                    <div className={styles.check_ins}>
                        <div className={styles.box}>
                            <p>853</p>
                            <p>Check-ins</p>
                        </div>
                    </div>
                    <div className={styles.timeLine}>
                        <div className={styles.flex}>
                            <div className={styles.icons}>
                                <Image src={calender} />
                            </div>
                            <p>1 Dec 2023</p>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.icons}>
                                <Image src={time} />
                            </div>
                            <p>3:30 PM - 10:00 PM</p>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.icons}>
                                <Image src={location} />
                            </div>
                            <p>New York, 10001</p>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.icons}>
                                <Image src={genre} />
                            </div>
                            <p>Pop, Rock, Blues</p>
                        </div>
                    </div>

                    <div className={styles.mapContainer}>
                        <MapComponent />
                    </div>

                    <div className={styles.buttonsContainer}>
                        <button className={styles.outline}>Check-In live</button>
                        <button className={styles.filled}>Get direction</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistSidebar