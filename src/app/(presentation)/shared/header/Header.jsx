"use client"
import React, { useState, useEffect } from 'react'
import styles from "./header.module.css"
import Image from "next/image"
import ellipse from '../../../../../public/images/Ellipse 190.svg'
import bandwogan from '../../../../../public/images/BandWagon.svg'
import search from "../../../../../public/images/search.svg"
import backArro from "../../../../../public/arrow_back.svg"
import Link from "next/link"
import { useSession, getSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Button } from '@nextui-org/react'
import { useSelector, useDispatch } from "react-redux"
import {
    fetchProfileData,
    updateUserRole,
    setSearchTerm,
    setIsExpanded,
    clearRecentSearch,
    resetSearch
} from "../../../../config/store/features/ProfileSlice/profileScreen"

const Header = ({ onRoleChange, role, profileImage, isRoleUpdating, isExpanded, searchTerm, recentSearches, handleClose, handleFocus, handleSearch, handleClearRecentSearch }) => {
    // const { data: session, status } = useSession();
    // const dispatch = useDispatch();


    // const {
    //     profile,
    //     isRoleUpdating,
    //     isExpanded,
    //     searchTerm,
    //     recentSearches
    // } = useSelector(state => state.profile);


    // useEffect(() => {
    //     if (status === 'authenticated' && session?.user?.id) {
    //         dispatch(fetchProfileData(session.user.id));
    //     }
    // }, [status, session, dispatch]);


    // const handleRoleSwitch = async () => {
    //     if (!session?.user?.id) {
    //         toast.error('User session not found. Please log in.');
    //         return;
    //     }

    //     const newRole = role === "user" ? "artist" : "user";

    //     await dispatch(updateUserRole({
    //         userId: session.user.id,
    //         newRole
    //     }));


    //     await getSession();
    // };


    // const handleFocus = () => {
    //     dispatch(setIsExpanded(true));
    // };

    // const handleClose = () => {
    //     dispatch(resetSearch());
    // };

    // const handleSearch = (e) => {
    //     dispatch(setSearchTerm(e.target.value));
    // };

    // const handleClearRecentSearch = (index) => {
    //     dispatch(clearRecentSearch(index));
    // };

    useEffect(() => {
        console.log("Profile Data: ", profileImage);

    })

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
                                <Image src={backArro} alt="back arrow" />
                            </span>
                        )}
                        {!isExpanded && (
                            <span className={styles.searchIcon}>
                                <Image src={search} alt="search icon" />
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
                                    <button onClick={() => handleClearRecentSearch(index)} className={styles.clearButton}>
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
                    {!profileImage && (
                        <p>Loading...</p>
                    )}
                    {profileImage && (
                        <Image
                            src={profileImage}
                            alt="Profile picture"
                            width={40}
                            height={40}
                            className={styles.profile}
                        />
                    )}

                    <div className={styles.roleSwitch}>
                        <Button
                            className="bg-primary text-white h-7 w-[110px]"
                            onClick={onRoleChange}
                            disabled={isRoleUpdating}
                        >
                            {!role && (
                                null
                            )}
                            Switch to {role === "user" ? "artist" : "user"}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
