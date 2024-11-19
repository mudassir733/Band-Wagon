import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './editProfile.module.css';
import profileImg from "../../../../../../public/profile-screen.svg";
import edit from "../../../../../../public/edit-pen.png";
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import ParentLayout from "../../../shared/Layout/ParentLayout"

const EditProfile = () => {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState({
        name: '',
        username: '',
        location: '',
        profileImage: ''
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [inputValues, setInputValues] = useState({
        name: '',
        username: '',
        location: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);



    useEffect(() => {


        const fetchProfile = async () => {
            if (!session?.user?.id) return;

            try {
                const res = await fetch(`/api/users/${session.user.id}`);
                console.log("User Response:", res);
                if (res.ok) {
                    const data = await res.json();
                    console.log("User Data:", data.user);

                    setProfile({
                        name: data.user.name || '',
                        username: data.user.username || '',
                        location: data.user.location || '',
                        profileImage: data.user.profileImage || ''
                    });

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


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            uploadImageToCloudinary(file);
        }
    };


    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "band_wagon");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dx0rctl2g/image/upload", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (data.secure_url) {
                setInputValues((prev) => ({
                    ...prev,
                    profileImage: data.secure_url
                }));
            }
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            toast.error("Failed to upload image");
        }
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
                    name: inputValues.name || profile.name,
                    username: inputValues.username || profile.username,
                    location: inputValues.location || profile.location,
                    profileImage: profile.profileImage
                }),
            });

            if (response.ok) {
                const updatedProfile = await response.json();
                console.log("Updated profile", updatedProfile.user);

                toast.success("Profile updated successfully!");


                setProfile({
                    name: updatedProfile.user.name,
                    username: updatedProfile.user.username,
                    location: updatedProfile.user.location,
                    profileImage: updatedProfile.user.profileImage
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
        <>
            <ParentLayout>
                <div className={styles.container}>

                    <div className={styles.mid_section}>
                        <div className={styles.title}>
                            <h3>Edit Profile</h3>
                        </div>
                        <div className={styles.profileCard}>
                            <div className={styles.person}>
                                <Image
                                    src={selectedImage || profile.profileImage || profileImg}
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
                            <div className={styles.personInfo}>
                                <h3>Name: <span className="active">{profile.name}</span></h3>
                                <h4>UserName: <span className='active'>{profile.username}</span></h4>

                                <div className={styles.userLocation}>
                                    <h4>Location: <span className='active'>{profile.location}</span></h4>
                                </div>
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
                                            autoComplete='off'
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
                                            autoComplete='off'
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
                                            autoComplete='off'
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
            </ParentLayout>

        </>
    );
};

export default EditProfile;
