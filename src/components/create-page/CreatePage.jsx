import React, { useState } from 'react'
import styles from "./createPage.module.css"
import edit from "../../../public/edit-pen.png"
import profile from "../../../public/profile-screen.svg"
import Image from 'next/image'
import facebook from "../../../public/facebook.svg"
import twitter from "../../../public/twitter.svg"
import cloud from "../../../public/cloud.svg"
import spotify from "../../../public/spotify.svg"
import vemo from "../../../public/Vector.svg"
import monitize from "../../../public/monetization_on.svg"
import user from "../../../public/Profile.svg"
import verify from "../../../public/new_releases.svg"
import { IoMdAdd } from "react-icons/io";




const CreatePage = () => {
    const [genres, setGenres] = useState([]);
    const [month, setMonth] = useState('September');
    const [year, setYear] = useState('2023');

    const toggleGenre = (genre) => {
        setGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };


    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];


    const years = Array.from({ length: 10 }, (_, i) => (2023 + i).toString());
    return (
        <div className={styles.container}>
            <div className={styles.mid_section}>
                <div className={styles.flex_box}>
                    <h2 className='heading_3_regular'>Create page</h2>

                    <div className={styles.person}>
                        <Image src={profile} />
                        <div className={styles.edit}>
                            <Image src={edit} />
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div className={styles.inputSection}>

                        <div className={styles.inputField}>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Artist name" className={styles.input} />
                            </div>
                        </div>

                        <div className={styles.inputField}>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Location" className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder="bio" className={styles.input} />
                            </div>
                        </div>


                    </div>

                    <div className={styles.performanceSection}>
                        <h3>When did you start performing</h3>
                        <label className={styles.label}>Start date</label>
                        <div className={styles.selectGroup}>
                            <div className={styles.selectWrapper}>
                                <select
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className={styles.select}
                                >
                                    {months.map((m) => (
                                        <option key={m} value={m} className={styles.options}>{m}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.selectWrapper}>
                                <select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className={styles.select}
                                >
                                    {years.map((y) => (
                                        <option key={y} value={y} className={styles.options}>{y}</option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <h3>How many shows have you performed</h3>
                        <div className={styles.selectWrapper}>
                            <select className={styles.select}>
                                <option className={styles.options}>Select shows</option>
                                <option className={styles.options}>1-10</option>
                                <option className={styles.options}>10-20</option>
                            </select>
                        </div>

                    </div>

                    <div className={styles.genreSection}>
                        <h5 className='heading_5_regular'>Genre</h5>
                        <p className='p_small_regular'>Select all that apply</p>
                        <div className={styles.genreGrid}>
                            {['Blues', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 'Hip-Hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'Reggae', 'R&B', 'Rock', 'Soul'].map(
                                (genre) => (
                                    <button
                                        key={genre}
                                        className={`${styles.genreButton} ${genres.includes(genre) ? styles.active : ''
                                            }`}
                                        onClick={() => toggleGenre(genre)}
                                    >
                                        {genre}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className={styles.socialMediaSection}>
                        <p>Link Social accounts</p>
                        <div className={styles.socialLinks}>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={facebook} />
                                </div>
                                <button className={styles.socialButton}>Facebook</button>
                            </div>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={twitter} />
                                </div>
                                <button className={styles.socialButton}>Twitter</button>
                            </div>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={spotify} />
                                </div>
                                <button className={styles.socialButton}>Spotify</button>

                            </div>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={cloud} />
                                </div>
                                <button className={styles.socialButton}>Cloud</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.socialMediaSection}>
                        <p>Link Payment accounts</p>
                        <div className={styles.socialLinks}>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={vemo} />
                                </div>
                                <button className={styles.socialButton}>Vemo</button>
                            </div>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={monitize} />
                                </div>
                                <button className={styles.socialButton}>Cashapp</button>
                            </div>

                        </div>
                    </div>

                    <div className={styles.admin_accout_container}>
                        <p>Admin accounts</p>

                        <div className={styles.user_container}>
                            <div className={styles.user_flex}>
                                <div>
                                    <Image src={user} width={60} height={60} />
                                </div>
                                <div className={styles.list_content}>
                                    <li>
                                        <h6 className='heading_6_regular'>Andy Warhool</h6>
                                        <Image src={verify} />
                                    </li>
                                    <div>
                                        <span className='p_x_regular'>andywarhool234</span>
                                    </div>
                                </div>


                                <div className={styles.btn}>
                                    <button>Approve</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={styles.btn_box}>
                        <div className={styles.btn_1}>
                            <span><IoMdAdd /></span>
                            <button>
                                Add Users
                            </button>
                        </div>
                        <div className={styles.btn_2}>
                            <button>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage