import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './editProfile.module.css';
import profileImg from "../../../public/profile-screen.svg";
import edit from "../../../public/edit-pen.png";
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const { data: session } = useSession();
    const [profile, setProfile] = useState({
        name: '',
        username: '',
        location: '',
        profileImage: ''
    });
    const [inputValues, setInputValues] = useState({
        name: '',
        username: '',
        location: ''
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!session?.user?.id) return;

            try {
                const res = await fetch(`/api/users/${session.user.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProfile({
                        name: data.name || '',
                        username: data.username || '',
                        location: data.location || '',
                        profileImage: data.profileImage || ''
                    });
                    // Initialize inputValues with current profile data
                    setInputValues({
                        name: '',
                        username: '',
                        location: ''
                    });
                } else {
                    toast.error('Failed to load profile data');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('An error occurred while fetching profile data');
            } finally {
                setLoading(false);
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!session?.user?.id) {
            toast.error('User ID is missing');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/users/${session.user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: inputValues.name,
                    username: inputValues.username,
                    location: inputValues.location,
                }),
            });

            if (response.ok) {
                const updatedProfile = await response.json();
                console.log("Updated profile", updatedProfile);

                toast.success("Profile updated successfully!");

                setProfile({
                    name: updatedProfile.name,
                    username: updatedProfile.username,
                    location: updatedProfile.location,
                    profileImage: updatedProfile.profileImage
                });

                setInputValues({
                    name: '',
                    username: '',
                    location: ''
                });

                await fetch('/api/auth/session?update');

            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.container}>

            <div className={styles.mid_section}>
                <div className={styles.title}>
                    <h3>Edit Profile</h3>
                </div>
                <div className={styles.profileCard}>
                    <div className={styles.person}>
                        <Image src={profile.profileImage || profileImg} alt="Profile Picture" width={120} height={120} className={styles.prodilePicture} />
                        <div className={styles.edit}>
                            <Image src={edit} alt="Edit Icon" />
                        </div>
                    </div>
                    <div className={styles.personInfo}>
                        <h3>{profile.name || 'Name not set'}</h3>
                        <p>{profile.username || 'Username not set'}</p>
                    </div>
                </div>
                <div className={styles.cardShow_container}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={styles.inputField}>
                            <label htmlFor="name">Name</label>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={inputValues.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="username">User Name</label>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={inputValues.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="location">Location</label>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={inputValues.location}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className={styles.btn_box}>
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
