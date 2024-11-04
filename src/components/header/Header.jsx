"use client"
import React, { useState, useEffect } from 'react'
import styles from "./Header.module.css"
import Image from "next/image"
import ellipse from '../../../public/images/Ellipse 190.svg'
import bandwogan from '../../../public/images/BandWagon.svg'
import search from "../../../public/images/search.svg"
import backArro from "../../../public/arrow_back.svg"
import ProfileImg from "../../../public/images/Profile.svg"
import Link from "next/link"
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const Header = () => {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState({
        profileImage: '',
        profile: ProfileImg
    });
    const [role, setRole] = useState(session?.user?.role || "user");
    const [isRoleUpdating, setIsRoleUpdating] = useState(false);

    const fetchProfile = async () => {
        if (!session?.user?.id) return;
        try {
            const res = await fetch(`/api/users/${session.user.id}`);

            if (res.ok) {
                const data = await res.json();
                setProfile({
                    profileImage: data.profileImage || ''
                });
                setRole(data.role || 'user');
            } else {
                toast.error('Failed to load profile data');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast.error('An error occurred while fetching profile data');
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            fetchProfile();
        }
    }, [status, session]);

    // Role switch function
    const handleRoleSwitch = async () => {
        if (!session?.user?.id) {
            toast.error('User session not found. Please log in.');
            return;
        }

        const newRole = role === "user" ? "artist" : "user";
        setIsRoleUpdating(true);
        console.log(newRole)

        try {
            const res = await fetch(`/api/users/${session.user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });

            if (res.ok) {
                const data = await res.json();
                setRole(data.role);
                toast.success(`Role updated to ${data.role}`);

                // If the new role is "artist," update verified status of user's shows
                if (newRole === "artist") {
                    const showUpdateResponse = await fetch(`/api/shows/updateVerifiedStatus`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: session.user.id, verified: true })
                    });

                    if (showUpdateResponse.ok) {
                        toast.success("Verified status of your shows updated successfully.");
                    } else {
                        const showUpdateError = await showUpdateResponse.json();
                        toast.error(`Failed to update shows' verified status: ${showUpdateError.message}`);
                    }
                }
            } else {
                const errorData = await res.json();
                toast.error(`Failed to update role: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating role:', error.message);
            toast.error('An error occurred while updating role');
        } finally {
            setIsRoleUpdating(false);
        }
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState([
        { name: 'Allen Ruppersberg', image: '/andy.svg' },
        { name: 'Andy Warhol', image: '/andy.svg' },
        { name: '555 55th St N, State Zip' },
        { name: 'BandWagon, 555 55th St N, City St...' }
    ]);

    const handleFocus = () => {
        setIsExpanded(true);
    };

    const handleClose = () => {
        setIsExpanded(false);
        setSearchTerm('');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearRecentSearch = (index) => {
        setRecentSearches(recentSearches.filter((_, i) => i !== index));
    };

    return (
        <header className={styles.header}>
            <div>
                <Link href="/" className={styles.group}>
                    <div className="ellipse">
                        <Image src={ellipse} alt="ellipse icon" />
                    </div>
                    <div className="bandwogan">
                        <Image src={bandwogan} alt="Band wogan logo" />
                    </div>
                </Link>
            </div>
            <nav className={styles.nav}>
                <div className={styles.searchContainer}>
                    <div className={`${styles.searchBar} ${isExpanded ? styles.active : ''}`}>
                        {isExpanded && (
                            <span className={styles.backIcon} onClick={handleClose}>
                                <Image src={backArro} />
                            </span>
                        )}
                        {!isExpanded && (
                            <span className={styles.searchIcon}>
                                <Image src={search} />
                            </span>

                        )}

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            onFocus={handleFocus}
                            placeholder="Search for Artist, Venues, or Addresses"
                            className={styles.input}
                        />
                    </div>

                    {isExpanded && (
                        <div className={styles.recentSearches}>
                            <p className={styles.recentSearchLabel}>Recent searches</p>
                            {recentSearches.map((search, index) => (
                                <div key={index} className={styles.recentSearchItem}>
                                    <div className={styles.flexSearchItem}>
                                        {search.image && (
                                            <Image
                                                src={search.image}
                                                width={40}
                                                height={40}
                                                alt={search.name}
                                                className={styles.searchImage}
                                            />
                                        )}
                                        <span>{search.name}</span>
                                    </div>
                                    <button onClick={() => clearRecentSearch(index)} className={styles.clearButton}>
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
            <div>
                <div className={styles.role_container}>
                    {!profile.profileImage && (
                        <Image src={profile.profile} width={40} height={40} className={styles.profile} />
                    )}
                    {profile.profileImage && (
                        <Image
                            src={profile.profileImage}
                            alt="Profile picture"
                            width={40}
                            height={40}
                            className={styles.profile}
                        />
                    )}

                    <div className={styles.roleSwitch}>
                        <button
                            onClick={handleRoleSwitch}
                            disabled={isRoleUpdating} // Disable button when updating
                            className={styles.switchButton}
                        >
                            Switch to {role === "user" ? "artist" : "user"}
                        </button>
                    </div>
                </div>


            </div>
        </header>
    );
};

export default Header;
