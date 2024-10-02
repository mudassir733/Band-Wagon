
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './editProdile.module.css';
import profile from "../../../public/profile-screen.svg"
import edit from "../../../public/edit-pen.png"


const EditProfile = () => {


    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h3>Edit profile</h3>
            </div>
            <div className={styles.mid_section}>
                <div className={styles.profileCard}>
                    <div className={styles.person}>
                        <Image src={profile} />
                        <div className={styles.edit}>
                            <Image src={edit} />
                        </div>
                    </div>
                    <div className={styles.personInfo}>
                        <h3>Andy Warhool</h3>
                    </div>
                </div>
                <div className={styles.cardShow_container}>
                    <div className={styles.inputField}>
                        <label htmlFor="name">Name</label>
                        <div className={styles.inputBox}>
                            <input type="text" name="name" id="name" />
                        </div>
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="userName">User Name</label>
                        <div className={styles.inputBox}>
                            <input type="text" name="userName" id="userName" />
                        </div>
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="location">Location</label>
                        <div className={styles.inputBox}>
                            <input type="text" name="location" id="location" />
                        </div>

                        <div className={styles.btn_box}>
                            <button>Save</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditProfile;