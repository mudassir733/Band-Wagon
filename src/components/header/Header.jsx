import React, { useState } from 'react'
import styles from "./Header.module.css"
import Image from "next/image"
import ellipse from '../../../public/images/Ellipse 190.svg'
import bandwogan from '../../../public/images/BandWagon.svg'
import search from "../../../public/images/search.svg"
import backArro from "../../../public/arrow_back.svg"
import ProfileImage from "../../../public/images/Profile.svg"
import Link from "next/link"
import { useSession } from 'next-auth/react'


const Header = () => {
    const { data: session } = useSession()


    console.log(session?.user)



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

                        <Image src={ellipse} alt='ellipse icon' />

                    </div>
                    <div className="bandwogan">
                        <Image src={bandwogan} alt='Band wogan logo' />
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
                                        {search.image && <Image src={search.image} width={40}
                                            height={40} alt={search.name} className={styles.searchImage} />}
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
                {session?.user ? (
                    <div>
                        <Image
                            src={session?.user?.image ? session.user.image : ProfileImage}
                            alt={`${session.user.name}'s profile picture`}
                            width={40}
                            height={40}
                            className={styles.profile}
                        />
                    </div>
                ) : (
                    <p>Please log in</p>
                )}
            </div>
        </header>
    )
}

export default Header