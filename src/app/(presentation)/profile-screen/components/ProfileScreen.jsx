import React, { useEffect, useState } from 'react';
import styles from "./profileScreen.module.css";
import Sidebar from "../../shared/sidebar/Sidebar";
import ProfileImage from "../../../../../public/profile-screen.svg";
import Image from 'next/image';
import rightChev from "../../../../../public/chevron_right.svg";
import Link from "next/link";
import { useSession } from 'next-auth/react';

const ProfileScreen = () => {
    const { data: session } = useSession();
    const [profileData, setProfileData] = useState({
        profileImage: '',
        name: '',
        username: '',
        role: '',
        loading: true
    });


    useEffect(() => {
        const fetchProfileData = async () => {
            if (session?.user?.id) {
                try {
                    const response = await fetch(`/api/users/${session.user.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Data", data);

                        setProfileData({
                            profileImage: data.profileImage || '',
                            name: data.name || '',
                            username: data.username || '',
                            role: data.role || '',
                            loading: false
                        });
                    } else {
                        setProfileData((prev) => ({ ...prev, loading: false }));
                        console.error("Failed to fetch profile data");
                    }
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                    setProfileData((prev) => ({ ...prev, loading: false }));
                }
            }
        };

        fetchProfileData();
    }, [session?.user?.id]);

    if (profileData.loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <>
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.mid_section}>
                    <div className={styles.profileCard}>
                        <div className={styles.person}>
                            <Image
                                src={profileData.profileImage ? profileData.profileImage : ProfileImage}
                                width={120}
                                height={120}
                                alt="Profile Image"
                                className={styles.profile}
                            />
                        </div>
                        <div className={styles.personInfo}>
                            <div>
                                <h3>{profileData.name}</h3>
                                <p>{profileData.username}</p> {/* Displaying the username */}
                            </div>
                        </div>
                        <Link href="/edit-profile">
                            <div className={styles.btn_box}>
                                <button>Edit profile</button>
                            </div>
                        </Link>
                    </div>

                    {/* Checking the role from profileData instead of session */}
                    {profileData.role === "artist" && (
                        <>
                            <div className={styles.cardShow_container}>
                                <Link href="/artist-page-management">
                                    <div className={styles.cardNextShow}>
                                        <div className={styles.left}>
                                            <p>Artist page management</p>
                                        </div>
                                        <div className={styles.right}>
                                            <Image src={rightChev} alt="Chevron" />
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className={styles.cardShow_container}>
                                <Link href="/saved-artists">
                                    <div className={styles.cardNextShow}>
                                        <div className={styles.left}>
                                            <p>View saved & hidden artists</p>
                                        </div>
                                        <div className={styles.right}>
                                            <Image src={rightChev} alt="Chevron" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div >
        </>
    );
};

export default ProfileScreen;
