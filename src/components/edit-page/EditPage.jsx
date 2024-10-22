"use client";
import React, { useState, useEffect } from "react";
import styles from "./editPage.module.css";
import profilePlaceholder from "../../../public/profile-screen.svg";
import Image from "next/image";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

const EditPage = () => {
    const [artistsData, setArtistsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch("/api/artist");
                console.log(response);


                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error response:", errorData);
                    throw new Error(errorData.message || "Failed to fetch artist data");
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setArtistsData(data);
                } else {
                    console.error("Unexpected response format:", data);
                }
            } catch (error) {
                console.error("Error fetching artist data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (artistsData.length === 0) {
        return <p>No artists found.</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.mid_section}>
                <h2 className="heading_3_regular">Edit page</h2>

                <div className={styles.column}>
                    {artistsData.map((artist, index) => (
                        <div key={index} className={styles.pageBox}>
                            <div className={styles.person}>
                                <Image
                                    src={artist.profileImage || profilePlaceholder}
                                    alt={`${artist.artistName}'s Profile Picture`}
                                    width={120}
                                    height={120}
                                    className={styles.profilePicture}
                                />
                            </div>
                            <div className={styles.title}>
                                <h1 className="heading_6_regular">{artist.artistName}</h1>
                            </div>

                            <div className={styles.button_box}>
                                <Link href={`/edit-page/${artist._id}`}>
                                    <button className={styles.link_btn}>Edit Profile</button>
                                </Link>
                                <Link href="/upcoming-schedule">
                                    <button className={styles.link_btn}>Show Schedule</button>
                                </Link>
                                <Link href="/past-shows">
                                    <button className={styles.link_btn}>Past Shows</button>
                                </Link>
                            </div>
                        </div>
                    ))}

                    <div className={styles.btn_box}>
                        <Link href="/create-page">
                            <div className={styles.btn}>
                                <span>
                                    <IoMdAdd />
                                </span>
                                <button>Create Page</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPage;
