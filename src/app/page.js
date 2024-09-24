"use client"
import React, { useState } from "react"
import Header from "../components/header/Header"
import instant from "../../public/images/instant_mix.png"
import genres from "../../public/images/genres.png"
import schedule from "../../public/images/schedule.svg"
import fav from "../../public/images/favorite.svg"
import check_circle from "../../public/images/check_circle.svg"
import Image from 'next/image'
import styles from './styles.module.css'

const Dropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownToggle} onClick={() => setIsOpen(!isOpen)}>
        {label} <span className={styles.arrow}>▼</span>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Home() {
  const [isIndex, setIndex] = useState(null)

  const handleActive = (index) => {
    setIndex(index)
  }

  return (
    <>
      <Header />
      <div className={styles.map}>
        <div className={styles.flex_nav}>
          <nav className={styles.navbar}>
            <duv className={styles.flex}>
              <div className={styles.box}>
                <button className={styles.iconButton}>
                  <Image src={instant} />
                </button>
              </div>
              <div className={isIndex === 0 ? `${styles.box} ${styles.active}` : `${styles.box}`} onClick={() => handleActive(0)}>
                <div>
                  <Image src={genres} />
                </div>
                <Dropdown label="Genre" options={['Rock', 'Pop', 'Jazz', 'Classical']} />
              </div>
              <div className={isIndex === 1 ? `${styles.box} ${styles.active}` : `${styles.box}`} onClick={() => handleActive(1)}>
                <div>
                  <Image src={schedule} />
                </div>
                <Dropdown label="Time" options={['Today', 'This Week', 'This Month', 'This Year']} />
              </div>
              <div className={styles.box}>
                <div>
                  <Image src={fav} />
                </div>
                <button className={styles.iconButton}>

                  Saved
                </button>
              </div>
              <div className={styles.box}>

                <Image src={check_circle} />
                <button className={styles.iconButton}>
                  Verified
                </button>
              </div>
            </duv>
          </nav>
        </div>

      </div>
    </>


  );
}
