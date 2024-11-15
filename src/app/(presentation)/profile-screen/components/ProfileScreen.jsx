import React, { useEffect } from 'react';
import styles from "./profileScreen.module.css";
import Sidebar from "../../shared/sidebar/Sidebar";
import ProfileImage from "../../../../../public/profile-screen.svg";
import Image from 'next/image';
import rightChev from "../../../../../public/chevron_right.svg";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileData } from '../../../../config/store/features/ProfileSlice/profileScreen';

const ProfileScreen = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch();

    let { profileImage, name, username, role, loading, error } = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        if (session?.user?.id) {
            dispatch(fetchProfileData(session.user.id));
        }
    }, [session?.user?.id, dispatch]);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>Error loading profile: {error}</p>;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.mid_section}>
                    <div className={styles.profileCard}>
                        <div className={styles.person}>
                            <Image
                                src={profileImage}
                                width={120}
                                height={120}
                                alt="Profile Image"
                                className={styles.profile}
                            />
                        </div>
                        <div className={styles.personInfo}>
                            <div>
                                <h3>{name}</h3>
                                <p>{username}</p>
                            </div>
                        </div>
                        <Link href="/edit-profile">
                            <div className={styles.btn_box}>
                                <button>Edit profile</button>
                            </div>
                        </Link>
                    </div>

                    {role === "artist" && (
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
