import React, { useEffect, useState } from 'react'
import styles from "./artistPageManagement.module.css"
import Image from 'next/image'
import location from "../../../../../public/create page.svg"
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link"

const ArtistPageManagement = () => {
    const [hasArtist, setHasArtist] = useState(false)

    useEffect(() => {
        const checkHasArtist = async () => {
            try {
                const response = await fetch("/api/artist")
                console.log(response);

                if (response.ok) {
                    setHasArtist(true)
                }
            } catch (error) {
                console.log("Error fetching artist data:", error.message);

            }

        }


        checkHasArtist()
    })
    return (
        <div className={styles.container}>
            <div className={styles.mid_section}>
                <h3 className='heading_3_regular'>Artist page management</h3>
                <div className={styles.create_artist_page}>
                    <div className={styles.artist_page_box}>
                        <div className={styles.image}>
                            <Image src={location} />
                        </div>

                        <div className={styles.content}>
                            <h2 className='heading_2_medium'>Create an artist page</h2>
                            <ul className={styles.list}>
                                <li>
                                    <FaRegCheckCircle color='#1ED760' size={24} />
                                    <p className='p_medium'>List your upcoming shows</p>
                                </li>
                                <li>
                                    <FaRegCheckCircle color='#1ED760' size={24} />
                                    <p className='p_medium'>Link social media, music, and payment accounts</p>
                                </li>
                                <li>
                                    <FaRegCheckCircle color='#1ED760' size={24} />
                                    <p className='p_medium'>See performance metrics from past shows</p>
                                </li>

                                <div className={styles.btn}>
                                    <span><IoMdAdd /></span>
                                    <Link href="/create-page">
                                        <button>
                                            Create Page
                                        </button>
                                    </Link>
                                </div>

                                {(hasArtist && (
                                    <div className={styles.btn1}>
                                        <span><IoMdAdd /></span>
                                        <Link href="/edit-page">
                                            <button>
                                                View Page
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistPageManagement