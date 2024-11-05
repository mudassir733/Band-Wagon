"use client"
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from "./Slider.module.css"
import verify from "../../../../../public/new_releases.svg"
import location from "../../../../../public/location_on.svg"
import date from "../../../../../public/calendar_month.svg"
import genre from "../../../../../public/genres.svg"



const profiles = [
    {
        name: 'Allen Ruppersberg',
        location: 'New York City',
        date: '21 Oct, Thu @ 10 PM',
        venue: 'The New Museum',
        image: '/slider.png'
    },
    {
        name: 'Andy Warhol',
        location: 'New York City',
        date: '22 Oct, Fri @ 8 PM',
        venue: 'The New Museum',
        image: '/slider.png'
    },
    {
        name: 'Bill Gates',
        location: 'New York City',
        date: '23 Oct, Sat @ 9 PM',
        venue: 'The New Museum',
        image: '/slider.png'
    },
]

const Slider = () => {
    const sliderRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: currentIndex * sliderRef.current.offsetWidth,
                behavior: 'smooth'
            })
        }
    }, [currentIndex])

    const scroll = (direction) => {
        if (direction === 'left') {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
            )
        } else {
            setCurrentIndex((prevIndex) =>
                prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
            )
        }
    }

    return (
        <div className={styles.slider_container}>
            <div className={styles.resultContainer}>
                <div className={styles.result}>{profiles.length} results</div>
            </div>
            <button className={`${styles.slider_button} ${styles.prev}`} onClick={() => scroll('left')}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <div className={styles.slider} ref={sliderRef}>
                {[...profiles, ...profiles, ...profiles].map((profile, index) => (
                    <div key={index} className={styles.profile_card}>
                        <Image src={profile.image} alt={profile.name} width={280} height={180} className={styles.profile_image} />
                        <div className={styles.profile_info}>
                            <h3 className={styles.heading}>{profile.name} <span className={styles.verified}><Image src={verify} /></span></h3>
                            <div className={styles.info_flex}>
                                <Image src={location} />
                                <p className={styles.location}>{profile.location}</p></div>
                            <div className={styles.info_flex}>
                                <Image src={date} />
                                <p className={styles.date}>{profile.date}</p>
                            </div>
                            <div className={styles.info_flex}>
                                <Image src={genre} />
                                <p className={styles.venue}>{profile.venue}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className={`${styles.slider_button} ${styles.next}`} onClick={() => scroll('right')}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    )
}
export default Slider