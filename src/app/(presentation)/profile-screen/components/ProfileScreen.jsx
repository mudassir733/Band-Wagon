import React, { useEffect, useState } from 'react';
import styles from "./profileScreen.module.css";
import ProfileImage from "../../../../../public/profile-screen.svg";
import Image from 'next/image';
import rightChev from "../../../../../public/chevron_right.svg";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchProfileData } from '../../../../config/store/features/ProfileSlice/profileScreen';

const ProfileScreen = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const [isFetched, setIsFetched] = useState(false);

    const { profileImage, name, username, role, loading, error } = useSelector(
        (state) => ({
            profileImage: state.profile.profileImage || ProfileImage,
            name: state.profile.name || 'Unknown User',
            username: state.profile.username || 'unknown_username',
            role: state.profile.role,
            loading: state.profile.loading,
            error: state.profile.error,
        }),
        shallowEqual
    );

    useEffect(() => {
        const fetchProfile = async () => {
            const cachedUserId = localStorage.getItem("cachedUserId");

            if (session?.user?.id && session.user.id !== cachedUserId && !isFetched) {
                await dispatch(fetchProfileData(session.user.id));
                localStorage.setItem("cachedUserId", session.user.id);
                setIsFetched(true);
            }
        };

        fetchProfile();


        const handleVisibilityChange = () => {
            if (!document.hidden && session?.user?.id && !isFetched) {
                fetchProfile();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [session?.user?.id, dispatch, isFetched]);

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
                        <Link href="/profile-screen/edit-profile">
                            <div className={styles.btn_box}>
                                <button>Edit profile</button>
                            </div>
                        </Link>
                    </div>

                    {role === "artist" && (
                        <>
                            <ProfileLink
                                href="/artist-page-management"
                                text="Artist Page Management"
                                icon={rightChev}
                            />
                            <ProfileLink
                                href="/saved-artists"
                                text="View Saved & Hidden Artists"
                                icon={rightChev}
                            />
                        </>
                    )}
                </div>
            </div >
        </>
    );
};


const ProfileLink = ({ href, text, icon }) => (
    <div className={styles.cardShow_container}>
        <Link href={href}>
            <div className={styles.cardNextShow}>
                <div className={styles.left}>
                    <p>{text}</p>
                </div>
                <div className={styles.right}>
                    <Image src={icon} alt="Chevron" width={20} height={20} />
                </div>
            </div>
        </Link>
    </div>
);
export default ProfileScreen;
