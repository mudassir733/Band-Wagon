import React, { useState } from 'react'
import styles from "./pastShows.module.css"
import Image from "next/image";
import person from "../../../../../public/Photo.png";
import verified from "../../../../../public/new_releases.svg";
import location from "../../../../../public/location_on.svg";
import date from "../../../../../public/calendar_month.svg";
import time from "../../../../../public/images/schedule.svg";
import profile from "../../../../../public/profile-screen.svg"

const PastShows = () => {
    const [activeTab, setActiveTab] = useState("upcoming");

    const events = {
        upcoming: [
            {
                name: "Andy Warhol",
                location: "New York City",
                date: "29 Oct, Thu",
                time: "3:30 PM - 10:00 PM",
            },
            {
                name: "Pablo Picasso",
                location: "Madrid",
                date: "15 Nov, Wed",
                time: "2:00 PM - 9:00 PM",
            },
            {
                name: "Pablo Picasso",
                location: "Madrid",
                date: "15 Nov, Wed",
                time: "2:00 PM - 9:00 PM",
            },
        ],
        past: [
            {
                name: "Vincent van Gogh",
                location: "Amsterdam",
                date: "12 May, Fri",
                time: "1:00 PM - 8:00 PM",
            },
            {
                name: "Leonardo da Vinci",
                location: "Florence",
                date: "20 Apr, Thu",
                time: "10:00 AM - 5:00 PM",
            },
        ],
    };

    const filteredEvents = activeTab === "upcoming" ? events.upcoming : events.past;

    return (
        <div className={styles.container}>
            <div className={styles.mid_section}>
                <div className={styles.flex_box}>
                    <h2 className='heading_3_regular'>Past Shows</h2>

                    <div className={styles.profile_box}>
                        <div className={styles.person}>
                            <Image src={profile} />
                        </div>

                        <div>
                            <h5 className='heading_5_regular'>BandWagon music</h5>
                        </div>
                    </div>
                    <div className={styles.eventList}>
                        {filteredEvents.map((event, index) => (
                            <div key={index} className={styles.eventCard}>
                                <div className={styles.eventCardImage}>
                                    <Image src={person} alt="Event" />
                                </div>
                                <div className={styles.eventInfoFlex}>
                                    <div className={styles.eventInfo}>
                                        <h3 className={styles.eventName}>
                                            {event.name}
                                            <Image src={verified} alt="Verified" />
                                        </h3>
                                        <div className={styles.iconBox}>
                                            <Image src={location} width={18} height={18} alt="Location" />
                                            <p className={styles.eventLocation}>{event.location}</p>
                                        </div>
                                        <div className={styles.eventDateTime}>
                                            <div className={styles.iconBox}>
                                                <Image src={date} width={18} height={18} alt="Date" />
                                                <span className={styles.eventDate}>{event.date}</span>
                                            </div>
                                            <div className={styles.iconBox}>
                                                <Image src={time} width={18} height={18} alt="Time" />
                                                <span className={styles.eventTime}>{event.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.button}>
                                        <button className={styles.saveButton}>Check in</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PastShows