"use client"
import React, { useState } from "react"
import Header from "../components/header/Header"
import instant from "../../public/images/instant_mix.png"
import genres from "../../public/images/genres.png"
import schedule from "../../public/images/schedule.svg"
import fav from "../../public/images/favorite.svg"
import check_circle from "../../public/images/check_circle.svg"
import dropdown from "../../public/images/arrow_drop_down.svg"
import tick from "../../public/images/Tick.svg"
import unTick from "../../public/images/unTick.svg"
import Image from 'next/image'
import styles from './styles.module.css'
import Sidebar from "../components/sidebar/Sidebar"

const Dropdown = ({ label, options, isOpen, onToggle, selected = [], onSelect }) => {
  const handleSelect = (option, e) => {
    e.stopPropagation(); // Prevent dropdown from closing on checkbox click
    onSelect(option);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownToggle} onClick={onToggle}>
        {label} <span className={styles.arrow}><Image src={dropdown} alt="dropdown arrow" /></span>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li key={index} onClick={(e) => handleSelect(option, e)} className={styles.dropdownItem}>
              {selected.includes(option) ? <Image src={tick} alt="tick" /> : <Image src={unTick} alt="unTick" />}
              <span>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Home component
export default function Home() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreSelect = (genre) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter((g) => g !== genre)
        : [...prevSelectedGenres, genre]
    );
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Header />
      <div className={styles.map}>
        <div className={styles.flex_nav}>
          <nav className={styles.navbar}>
            <div className={styles.flex}>
              <div className={styles.box}>
                <button className={styles.iconButton}>
                  <Image src={instant} alt="instant" />
                </button>
              </div>
              <div className={openDropdownIndex === 0 ? `${styles.box} ${styles.active}` : `${styles.box}`} onClick={() => handleDropdownToggle(0)}>
                <div>
                  <Image src={genres} alt="genres" />
                </div>
                <Dropdown
                  label="Genre"
                  options={[
                    "Classical", "Blues", "EDM", "Country", "Funk", "Folk", "Jazz", "Hip-Hop", "Metal", "Latin", "Punk", "Pop", "Rock", "Reggae", "Soul", "R&B"
                  ]}
                  selected={selectedGenres}
                  onSelect={handleGenreSelect}
                  isOpen={openDropdownIndex === 0}
                  onToggle={() => handleDropdownToggle(0)}
                />
              </div>
              <div className={openDropdownIndex === 1 ? `${styles.box} ${styles.active}` : `${styles.box}`} onClick={() => handleDropdownToggle(1)}>
                <div>
                  <Image src={schedule} alt="schedule" />
                </div>
                <Dropdown
                  label="Time"
                  options={["Today", "This Week", "This Month", "This Year"]}
                  isOpen={openDropdownIndex === 1}
                  onToggle={() => handleDropdownToggle(1)}
                />
              </div>
              <div className={styles.box}>
                <div>
                  <Image src={fav} alt="favorite" />
                </div>
                <button className={styles.iconButton}>
                  Saved
                </button>
              </div>
              <div className={styles.box}>
                <Image src={check_circle} alt="check_circle" />
                <button className={styles.iconButton}>
                  Verified
                </button>
              </div>
            </div>
          </nav>
        </div>
        <Sidebar />
      </div>

    </>
  );
}
