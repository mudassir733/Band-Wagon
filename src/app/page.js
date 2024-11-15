"use client"
import React, { useState, useEffect } from "react"
import instant from "../../public/images/instant_mix.png"
import genres from "../../public/images/genres.png"
import schedule from "../../public/images/schedule.svg"
import fav from "../../public/images/favorite.svg"
import dropdown from "../../public/images/arrow_drop_down.svg"
import tick from "../../public/images/Tick.svg"
import unTick from "../../public/images/unTick.svg"
import Image from 'next/image'
import styles from './styles.module.css'
import MapComponent from "./(presentation)/shared/google-map/GoogleMaps"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LuSend } from "react-icons/lu";
import ParentLayout from "./(presentation)/shared/Layout/ParentLayout"



const Dropdown = ({ label, options, isOpen, onToggle, selected = [], onSelect }) => {
  const handleSelect = (option, e) => {
    e.stopPropagation();
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
              {(selected || []).includes(option) ? (
                <Image src={tick} alt="tick" />
              ) : (
                <Image src={unTick} alt="unTick" />
              )}
              <span>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



const DropdownTime = ({ label, isOpen, onToggle, selectedTime, onTimeSelect }) => (
  <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
    <button className={styles.dropdownToggle} onClick={onToggle}>
      {label} <span className={styles.arrow}><Image src={dropdown} alt="dropdown arrow" /></span>
    </button>
    {isOpen && (
      <div className={styles.dropdownMenu}>
        <div className={styles.dateBox}>
          <DatePicker
            selected={selectedTime}
            onChange={(time) => onTimeSelect(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Select time"
            className={styles.datePicker}
          />
        </div>
      </div>
    )}
  </div>
);

// Home component
export default function Home() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState(null);
  const [filterShows, setFilterShows] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [isFilterSelected, setIsFilterSelected] = useState(false);






  // get all shows
  useEffect(() => {
    const fetchAllShows = async () => {
      try {
        const response = await fetch("/api/shows");
        if (response.ok) {
          const data = await response.json();
          setAllShows(data.shows || []);
        } else {
          console.error("Error fetching all shows:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching all shows:", error);
      }
    };
    fetchAllShows();
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre) ? prevGenres.filter(g => g !== genre) : [...prevGenres, genre]
    );
    setIsFilterSelected(true);
  };



  const handleTimeFilterSelect = (timeFilter) => {
    setSelectedTimeFilter(timeFilter);
    setIsFilterSelected(true);
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(prevIndex => prevIndex === index ? null : index);
  };

  const fetchFilteredShows = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedGenres.length > 0) params.append('genres', selectedGenres.join(','));

      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        params.append('time', formattedDate);
      }

      const response = await fetch(`/api/shows?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setFilterShows(data.shows || []);
      } else {
        console.error("Error fetching shows:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching filtered shows:", error);
    }
    setIsFilterSelected(false);
  };


  return (
    <>
      <ParentLayout>
        <div className={styles.main_section}>
          <div className={styles.map}>
            <MapComponent shows={filterShows} allShows={allShows} />
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
                    <DropdownTime
                      label="Time"
                      selectedTime={selectedTimeFilter}
                      onTimeSelect={handleTimeFilterSelect}
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
                </div>

              </nav>
              {isFilterSelected ? (
                <button className={styles.applyButton} onClick={fetchFilteredShows}>
                  <LuSend />
                </button>
              ) : null}
            </div>

          </div >
        </div >
      </ParentLayout >
    </>
  );
}
