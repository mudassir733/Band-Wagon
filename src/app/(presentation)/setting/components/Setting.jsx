import React, { useState, useEffect } from 'react';
import styles from "./setting.module.css"
import Image from 'next/image';
import rightChev from "../../../../../public/chevron_right.svg"
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaUserMinus } from "react-icons/fa6";
import { RiContractLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoContrast } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosEye } from "react-icons/io";
import { LuSunMedium } from "react-icons/lu";
import { FaMoon } from "react-icons/fa6";
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Setting = () => {
    const { data: session } = useSession()
    const [activeSection, setActiveSection] = useState('changeEmail');
    const router = useRouter()
    const [profile, setProfile] = useState({
        email: '',
        password: "",
    });

    const [inputValues, setInputValues] = useState({
        email: '',
        password: "",
    });


    useEffect(() => {
        const fetchProfile = async () => {
            if (!session?.user?.id) return;

            try {
                const res = await fetch(`/api/users/${session.user.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProfile({
                        email: data.email || '',
                    });

                    setInputValues({
                        email: '',

                    });
                } else {
                    toast.error('Failed to load profile data');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('An error occurred while fetching profile data');
            }
        };

        fetchProfile();
    }, [session?.user?.id]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeleteChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };



    // Handle user delete account
    const handleUserDelete = async (e) => {
        e.preventDefault();


        const userId = session?.user?.id;

        if (!inputValues.password) {
            toast.error("Please enter your password");
            return;
        }

        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: inputValues.password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Account deleted successfully");

                signOut();
                router.push("/onboarding")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("An error occurred while deleting your account");
        }
    };






    const [switchStates, setSwitchStates] = useState({
        radius: false,
        playingNearYou1: false,
        playingNearYou2: false,
        playingNearYou3: false,
        playingNearYou4: false,
    });

    const toggleSwitch = (switchKey) => {
        setSwitchStates((prevStates) => ({
            ...prevStates,
            [switchKey]: !prevStates[switchKey],
        }));
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'changeEmail':
                return (
                    <div className={styles.content}>
                        <form className={styles.form} onSubmit={handleUserDelete}>
                            <div className={styles.heading}>
                                <h3>Change email</h3>
                            </div>
                            <div className={styles.input_box}>
                                <div>
                                    <MdOutlineMailOutline color='#525252' />

                                </div>
                                <input className={styles.input} name='email' type="email"
                                    id='email' autoComplete='off' placeholder="New email" value={inputValues.email} onChange={handleInputChange} />
                            </div>
                            <button type="submit" className={styles.btn}>Save changes</button>
                        </form>
                    </div>
                );
            case 'changePassword':
                return (
                    <div className={styles.content}>
                        <form className={styles.form}>
                            <div className={styles.heading}>
                                <h3>Change Password</h3>
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
                        <form className={styles.form} onSubmit={handleUserDelete}>
                            <div className={styles.heading}>
                                <h3>Delete Account</h3>
                            </div>
                            <div className={styles.input_box}>
                                <div>
                                    <RiLockPasswordLine color='#525252' />
                                </div>
                                <input type="password"
                                    onChange={handleDeleteChange}
                                    value={inputValues.password}
                                    name='password'
                                    className={styles.input}
                                    placeholder="Enter your password" />
                                <div>
                                    <IoIosEye color='#525252' />
                                </div>

                            </div>
                            <button className={styles.btn} type='submit'>Delete my account</button>
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
                        <div className={styles.flex_content}>
                            <h2>Notification</h2>
                            <div className={styles.flex_notification}>
                                <p>Playing near you now</p>
                                <div
                                    className={`${styles.switch} ${switchStates.radius ? styles.switchOn : styles.switchOff}`}
                                    onClick={() => toggleSwitch('radius')}
                                >
                                    <div
                                        className={`${styles.circle} ${switchStates.radius ? styles.circleOn : styles.circleOff}`}
                                    />
                                </div>
                            </div>

                            <div className={styles.flex_notification}>
                                <p>Radius</p>
                                <div>
                                    <div>
                                        <button>15 miles</button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.flex_notification}>
                                <p>Weekly show lineup</p>
                                <div
                                    className={`${styles.switch} ${switchStates.playingNearYou2 ? styles.switchOn : styles.switchOff}`}
                                    onClick={() => toggleSwitch('playingNearYou2')}
                                >
                                    <div
                                        className={`${styles.circle} ${switchStates.playingNearYou2 ? styles.circleOn : styles.circleOff}`}
                                    />
                                </div>
                            </div>

                            <div className={styles.flex_notification}>
                                <p>Saved show reminders</p>
                                <div
                                    className={`${styles.switch} ${switchStates.playingNearYou3 ? styles.switchOn : styles.switchOff}`}
                                    onClick={() => toggleSwitch('playingNearYou3')}
                                >
                                    <div
                                        className={`${styles.circle} ${switchStates.playingNearYou3 ? styles.circleOn : styles.circleOff}`}
                                    />
                                </div>
                            </div>
                            <div className={styles.flex_notification}>
                                <p>Marketing emails</p>
                                <div
                                    className={`${styles.switch} ${switchStates.playingNearYou4 ? styles.switchOn : styles.switchOff}`}
                                    onClick={() => toggleSwitch('playingNearYou4')}
                                >
                                    <div
                                        className={`${styles.circle} ${switchStates.playingNearYou4 ? styles.circleOn : styles.circleOff}`}
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                );
            case 'themes':
                return (
                    <div className={styles.content}>
                        <div className={styles.flex_content}>
                            <h2>Theme</h2>
                            <div className={`${styles.theme_btn}`}>
                                <div>
                                    <LuSunMedium size={24} />
                                </div>
                                <button onClick={() => alert('Light theme selected')}>Light Theme</button>
                            </div>
                            <div className={`${styles.theme_btn}`}>
                                <div>
                                    <FaMoon />
                                </div>

                                <button onClick={() => alert('Dark theme selected')}>Dark Theme</button>
                            </div>
                        </div>
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
                                        <Image src={rightChev} className={styles.rightChev} alt='right arrow icon' /></div>

                                </div>
                                <div className={styles.listIcon} onClick={() => setActiveSection('changePassword')}>


                                    <li>
                                        <div>
                                            <FaRegUser size={24} />
                                        </div>Change password</li>
                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} alt='right arrow icon' /></div>
                                </div>
                                <div className={styles.listIcon} onClick={() => setActiveSection('deleteAccount')}>


                                    <li > <div>
                                        <FaUserMinus size={24} />


                                    </div>Delete account</li>
                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} alt='right arrow icon' /></div>
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
                                        <Image src={rightChev} className={styles.rightChev} alt='right arrow icon' /></div>
                                </div>

                                <div className={styles.listIcon} onClick={() => setActiveSection('termsConditions')}>

                                    <li > <div>
                                        <RiContractLine size={24} />
                                    </div>Terms & conditions</li>

                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} alt='right arrow icon' /></div>
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
                                        <Image src={rightChev} className={styles.rightChev} alt='right arrow icon' /></div>
                                </div>

                                <div className={styles.listIcon} onClick={() => setActiveSection('themes')}>

                                    <li > <div>
                                        <IoContrast size={24} />
                                    </div>Themes</li>

                                    <div>
                                        <Image src={rightChev} className={styles.rightChev} alt='right arrow icon' /></div>
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
