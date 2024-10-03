import React, { useState } from 'react';
import styles from "./setting.module.css"
import Image from 'next/image';
import rightChev from "../../../public/chevron_right.svg"
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaUserMinus } from "react-icons/fa6";
import { RiContractLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoContrast } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosEye } from "react-icons/io";





const Setting = () => {
    const [activeSection, setActiveSection] = useState('changeEmail');

    const renderContent = () => {
        switch (activeSection) {
            case 'changeEmail':
                return (
                    <div className={styles.content}>
                        <h2>Change email</h2>
                        <form className={styles.form}>
                            <div className={styles.heading}>
                                <h3>Change email</h3>
                            </div>
                            <div className={styles.input_box}>
                                <div>
                                    <MdOutlineMailOutline color='#525252' />
                                </div>
                                <input className={styles.input} autoComplete='off' type="email" placeholder="Current email" />
                            </div>

                            <div className={styles.input_box}>
                                <div>
                                    <MdOutlineMailOutline color='#525252' />

                                </div>
                                <input className={styles.input} type="email" autoComplete='off' placeholder="New email" />
                            </div>
                            <div className={styles.input_box}>
                                <div>

                                    <RiLockPasswordLine color='#525252' />
                                </div>
                                <input className={styles.input} type="password" autoComplete='off' placeholder="Password" />
                                <div>
                                    <IoIosEye color='#525252' />
                                </div>

                            </div>
                            <button type="submit" className={styles.btn}>Save changes</button>
                        </form>
                    </div>
                );
            case 'changePassword':
                return (
                    <div className={styles.content}>
                        <h2>Change password</h2>
                        <form className={styles.form}>
                            <div className={styles.heading}>
                                <h3>Change email</h3>
                            </div>
                            <div className={styles.input_box}>
                                <div>
                                    <RiLockPasswordLine color='#525252' />
                                </div>
                                <input type="password" className={styles.input} placeholder="Current password" />

                                <div>
                                    <IoIosEye color='#525252' />
                                </div>

                            </div>
                            <div className={styles.input_box}>
                                <div>
                                    <RiLockPasswordLine color='#525252' />
                                </div>
                                <input type="password" className={styles.input} placeholder="New password" />

                                <div>
                                    <IoIosEye color='#525252' />
                                </div>


                            </div>
                            <div className={styles.input_box}>
                                <div>
                                    <RiLockPasswordLine color='#525252' />
                                </div>
                                <input type="password" className={styles.input} placeholder="Confirm password" />
                                <div>
                                    <IoIosEye color='#525252' />
                                </div>

                            </div>
                            <button type="submit" className={styles.btn}>Save changes</button>
                        </form>
                    </div>
                );
            case 'deleteAccount':
                return (
                    <div className={styles.content}>
                        <h2>Delete Account</h2>
                        <form className={styles.form}>
                            <div className={styles.heading}>
                                <h3>Delete Account</h3>
                            </div>
                            <div className={styles.input_box}>
                                <div>
                                    <RiLockPasswordLine color='#525252' />
                                </div>
                                <input type="password" className={styles.input} placeholder="password" />
                                <div>
                                    <IoIosEye color='#525252' />
                                </div>

                            </div>
                            <button className={styles.btn}>Delete my account</button>
                        </form>
                    </div>
                );
            case 'privacyPolicy':
                return (
                    <div className={styles.content}>
                        <h2>Privacy policy</h2>
                        <p>This is where the privacy policy details would be displayed.</p>
                    </div>
                );
            case 'termsConditions':
                return (
                    <div className={styles.content}>
                        <h2>Terms & Conditions</h2>
                        <p>This is where the terms and conditions details would be displayed.</p>
                    </div>
                );
            case 'notifications':
                return (
                    <div className={styles.content}>
                        <h2>Notification Settings</h2>
                        <label>
                            <input type="checkbox" /> Receive email notifications
                        </label>
                        <label>
                            <input type="checkbox" /> Receive push notifications
                        </label>
                        <button type="submit">Save changes</button>
                    </div>
                );
            case 'themes':
                return (
                    <div className={styles.content}>
                        <h2>Theme Settings</h2>
                        <button onClick={() => alert('Light theme selected')}>Light Theme</button>
                        <button onClick={() => alert('Dark theme selected')}>Dark Theme</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.mid_section}>
                <div className={styles.settingsPage}>
                    <div className={styles.sidebar}>
                        <dir className={styles.topHeader}>
                            <h3>Settings</h3>
                        </dir>
                        <div className={styles.section}>
                            <h3>Account</h3>
                            <ul>
                                <div className={styles.listIcon} onClick={() => setActiveSection('changeEmail')}>


                                    <li> <div>

                                        <MdOutlineMailOutline size={24} />

                                    </div>Change email </li>
                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} /></div>

                                </div>
                                <div className={styles.listIcon} onClick={() => setActiveSection('changePassword')}>


                                    <li>
                                        <div>
                                            <FaRegUser size={24} />
                                        </div>Change password</li>
                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} /></div>
                                </div>
                                <div className={styles.listIcon} onClick={() => setActiveSection('deleteAccount')}>


                                    <li > <div>
                                        <FaUserMinus size={24} />


                                    </div>Delete account</li>
                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} /></div>
                                </div>
                            </ul>
                        </div>
                        <div className={styles.section}>
                            <h3>Personal Info</h3>
                            <ul>

                                <div className={styles.listIcon} onClick={() => setActiveSection('privacyPolicy')}>

                                    <li > <div>
                                        <FaRegUser size={24} />
                                    </div>Privacy policy</li>

                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} /></div>
                                </div>

                                <div className={styles.listIcon} onClick={() => setActiveSection('termsConditions')}>

                                    <li > <div>
                                        <RiContractLine size={24} />
                                    </div>Terms & conditions</li>

                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} /></div>
                                </div>

                            </ul>
                        </div>
                        <div className={styles.section}>
                            <h3>General</h3>
                            <ul>
                                <div className={styles.listIcon} onClick={() => setActiveSection('notifications')}>

                                    <li > <div>
                                        <IoNotificationsOutline size={24} />

                                    </div>Notifications</li>

                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} /></div>
                                </div>

                                <div className={styles.listIcon} onClick={() => setActiveSection('themes')}>

                                    <li > <div>
                                        <IoContrast size={24} />
                                    </div>Themes</li>

                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} /></div>
                                </div>

                            </ul>
                        </div>
                    </div>
                    <div className={styles.mainContent}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;