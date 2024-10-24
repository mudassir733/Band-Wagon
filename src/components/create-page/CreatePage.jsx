import React, { useEffect, useState } from 'react'
import styles from "./createPage.module.css"
import edit from "../../../public/edit-pen.png"
import profileImg from "../../../public/profile-screen.svg"
import Image from 'next/image'
import facebook from "../../../public/facebook.svg"
import twitter from "../../../public/twitter.svg"
import cloud from "../../../public/cloud.svg"
import spotify from "../../../public/spotify.svg"
import vemo from "../../../public/Vector.svg"
import monitize from "../../../public/monetization_on.svg"
import user from "../../../public/Profile.svg"
import verify from "../../../public/new_releases.svg"
import { IoMdAdd } from "react-icons/io";
import axios from 'axios'
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from 'next-auth/react'


const cloudinaryPreset = 'band_wagon';
const cloudinaryCloudName = 'dx0rctl2g';


const CreatePage = () => {
    const { data: session } = useSession()
    const [profile, setProfile] = useState({
        name: "",
        username: "",
        profileImage: "",
    })
    const [artistName, setArtistName] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [genres, setGenres] = useState([]);
    const [startDate, setStartDate] = useState(new Date());  // DatePicker state
    const [showsPerformed, setShowsPerformed] = useState('');
    const router = useRouter();

    const toggleGenre = (genre) => {
        setGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUploadToCloudinary = async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', cloudinaryPreset);

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`, formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = '';
        if (image) {
            imageUrl = await handleUploadToCloudinary();
        }

        const formattedStartDate = startDate.toISOString().split('T')[0];

        const postData = {
            profileImage: imageUrl || 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG',
            artistName,
            location,
            bio,
            startDate: formattedStartDate,
            showsPerformed: parseInt(showsPerformed),
            genres,
        };
        console.log(postData);

        try {
            const response = await fetch('/api/artist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                toast.success('Artist page created successfully!');
                router.push("/edit-page");
            } else {
                toast.error('Error creating artist page!');
            }
        } catch (error) {
            toast.error(error.message);
            console.error('Error creating artist page', error.message);
        }
    };



    // Getting the user data
    useEffect(() => {
        const getUserData = async () => {
            if (!session?.user.id) return;
            console.log(session?.user?.id);


            try {
                const response = await fetch(`/api/users/${session.user.id}`)
                if (response.ok) {
                    const data = await response.json()
                    setProfile({
                        name: data.name,
                        username: data.username,
                        profileImage: data.profileImage,
                    })


                    console.log(data.name);


                }
            } catch (error) {
                console.log("Error while getting the useres data:", error.message);

            }

        }

        getUserData()
    }, [session?.user?.id])

    return (
        <div className={styles.container}>
            <div className={styles.mid_section}>
                <div className={styles.flex_box}>
                    <h2 className='heading_3_regular'>Create page</h2>

                    <div className={styles.person}>
                        <Image
                            src={profileImg}
                            alt="Profile Picture"
                            width={120}
                            height={120}
                            className={styles.prodilePicture}
                        />
                        <div className={styles.edit}>
                            <label htmlFor="profileImage">
                                <Image src={edit} alt="Edit Icon" />
                            </label>
                            <input
                                type="file"
                                id="profileImage"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className={styles.inputSection}>

                        <div className={styles.inputField}>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    placeholder="Artist name"
                                    className={styles.input}
                                    value={artistName}
                                    onChange={(e) => setArtistName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.inputField}>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className={styles.input}
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    placeholder="Bio"
                                    className={styles.input}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                        </div>


                    </div>

                    <div className={styles.performanceSection}>
                        <h3>When did you start performing</h3>
                        <label className={styles.label}>Start date</label>
                        <div className={styles.selectGroup}>
                            <div className={styles.inputBox}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className={styles.datePicker}
                                />
                            </div>
                        </div>

                        <h3>How many shows have you performed</h3>
                        <div className={styles.selectWrapper}>
                            <select className={styles.select} value={showsPerformed}
                                onChange={(e) => setShowsPerformed(e.target.value)}
                            >
                                <option className={styles.options}>Select shows</option>
                                <option className={styles.options} value="1-10">1-10</option>
                                <option className={styles.options} value="10-20">10-20</option>
                            </select>
                        </div>

                    </div>

                    <div className={styles.genreSection}>
                        <h5 className='heading_5_regular'>Genre</h5>
                        <p className='p_small_regular'>Select all that apply</p>
                        <div className={styles.genreGrid}>
                            {['Blues', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 'Hip-Hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'Reggae', 'R&B', 'Rock', 'Soul'].map(
                                (genre) => (
                                    <button
                                        key={genre}
                                        className={`${styles.genreButton} ${genres.includes(genre) ? styles.active : ''
                                            }`}
                                        onClick={() => toggleGenre(genre)}
                                    >
                                        {genre}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className={styles.socialMediaSection}>
                        <p>Link Social accounts</p>
                        <div className={styles.socialLinks}>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={facebook} />
                                </div>
                                <button className={styles.socialButton}>Facebook</button>
                            </div>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={twitter} />
                                </div>
                                <button className={styles.socialButton}>Twitter</button>
                            </div>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={spotify} />
                                </div>
                                <button className={styles.socialButton}>Spotify</button>

                            </div>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={cloud} />
                                </div>
                                <button className={styles.socialButton}>Cloud</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.socialMediaSection}>
                        <p>Link Payment accounts</p>
                        <div className={styles.socialLinks}>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={vemo} />
                                </div>
                                <button className={styles.socialButton}>Vemo</button>
                            </div>
                            <div className={styles.social_flex}>
                                <div>
                                    <Image src={monitize} />
                                </div>
                                <button className={styles.socialButton}>Cashapp</button>
                            </div>

                        </div>
                    </div>

                    <div className={styles.admin_accout_container}>
                        <p>Admin accounts</p>

                        <div className={styles.user_container}>
                            <div className={styles.user_flex}>
                                <div>
                                    <Image src={profile.profileImage} width={60} height={60} className={styles.artistProfile} />
                                </div>
                                <div className={styles.list_content}>
                                    <li>
                                        <h6 className='heading_6_regular'>{profile.name}</h6>
                                        <Image src={verify} />
                                    </li>
                                    <div>
                                        <span className='p_x_regular'>{profile.username}</span>
                                    </div>
                                </div>


                                <div className={styles.btn}>
                                    <button>Approve</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={styles.btn_box}>
                        <div className={styles.btn_1}>
                            <span><IoMdAdd /></span>
                            <button>
                                Add Users
                            </button>
                        </div>
                        <div className={styles.btn_2}>
                            <button onClick={handleSubmit}>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage