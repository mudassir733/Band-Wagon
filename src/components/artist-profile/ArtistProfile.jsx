"use client"
import React from 'react'
import Header from '../header/Header'
import styles from "./artistProfile.module.css"
import Image from "next/image"
import profile from '../../../public/Profile.svg'
import Link from "next/link"
import verified from "../../../public/new_releases.svg"
import location from "../../../public/location_on.svg"
import genre from "../../../public/genres.svg"
import calendar from "../../../public/calendar_month.svg"
import time from "../../../public/images/schedule.svg"
import monitize from "../../../public/monetization_on.svg"
import icon1 from "../../../public/spotify.svg"
import icon2 from "../../../public/facebook.svg"
import icon3 from "../../../public/youtube.svg"
import icon4 from "../../../public/twitter.svg"
import doller from "../../../public/pay_doller.svg"
import vector from "../../../public/Vector.svg"
import CheckInModel from "../../components/check-in/CheckInModel"



const ArtistProfile = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.mid_section}>
                    <div className={styles.title}>
                        <p>andywarhool234</p>
                    </div>
                    <div className={styles.artist_profile}>
                        <div className={styles.row}>
                            <div className={styles.left_col}>
                                <Image src={profile} width={130} height={130} />
                            </div>
                            <div className={styles.right_col}>
                                <div className={styles.frame}>
                                    <div className="name">
                                        <p>andywarhool234</p>
                                    </div>
                                    <div className={styles.buttons}>
                                        <button className={styles.button}>Favorite</button>
                                        <button className={styles.button}>Hide Artist</button>
                                    </div>
                                </div>

                                <div className={styles.frame2}>
                                    <div className={styles.artist_details}>
                                        <p>10+ Lives shows</p>
                                        <p>15 Years performing</p>
                                    </div>
                                    <div className={styles.artist_name}>
                                        <p>Andy Warhool</p>
                                        <Image src={verified} />
                                    </div>
                                    <div className={styles.icon_box}>
                                        <Image src={location} />
                                        <p>New York City</p>
                                    </div>
                                    <div className={styles.icon_box}>
                                        <Image src={genre} />
                                        <p>Pop, Rock, Blues</p>
                                    </div>
                                    <div className={styles.desc}>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </div>

                                </div>
                                <div className={styles.card}>
                                    <div className={styles.card_text}>
                                        <p>Next Shows</p>
                                    </div>
                                    <div className={styles.show_info}>
                                        <div className={styles.grid}>
                                            <div className={styles.info}>
                                                <Image src={calendar} width={24} height={24} />
                                                <p>29, Oct</p>
                                            </div>
                                            <div className={styles.info}>
                                                <Image src={location} width={24} height={24} />
                                                <p>29, Oct</p>
                                            </div>
                                            <div className={styles.info}>
                                                <Image src={time} width={24} height={24} />
                                                <p>29, Oct</p>
                                            </div>
                                            <div className={styles.info}>
                                                <Image src={monitize} width={24} height={24} />
                                                <p>29, Oct</p>
                                            </div>
                                        </div>

                                        <div className={styles.detail_btn}>
                                            <button className={styles.view_btn}>View Details</button>
                                            <button className={styles.live_btn}>Check in Live</button>

                                        </div>
                                    </div>
                                </div>

                                <div className={styles.social_media}>
                                    <div className={styles.social_title}>
                                        <p>Social media</p>
                                    </div>
                                    <div className={styles.social_icon}>
                                        <div className={styles.social_bg}>
                                            <Image src={icon1} width={21} height={21} />
                                        </div>
                                        <div className={styles.social_bg}>
                                            <Image src={icon2} width={21} height={21} />
                                        </div>
                                        <div className={styles.social_bg}>
                                            <Image src={icon3} width={21} height={21} />
                                        </div>
                                        <div className={styles.social_bg}>
                                            <Image src={icon4} width={21} height={21} />
                                        </div>



                                    </div>
                                </div>


                                <div className={styles.payment_account}>
                                    <p>Payment Account</p>

                                    <div className={styles.payment_icon}>
                                        <div className={styles.social_bg}>
                                            <Image src={doller} width={21} height={21} />
                                        </div>
                                        <div className={styles.social_bg}>
                                            <Image src={vector} width={21} height={21} />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.upComingShow}>
                                    <button className={styles.btn}>View upcoming & past shows</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <CheckInModel />
            </div>
        </>
    )

}

export default ArtistProfile