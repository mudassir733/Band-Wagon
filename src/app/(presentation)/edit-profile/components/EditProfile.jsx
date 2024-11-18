import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './editProfile.module.css';
import profileImg from "../../../../../public/profile-screen.svg";
import edit from "../../../../../public/edit-pen.png";
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import ParentLayout from "../../shared/Layout/ParentLayout"
import { fetchProfileData, updateUserRole } from "../../../../config/store/features/ProfileSlice/profileScreen"
import { useSelector, useDispatch } from "react-redux"

const EditProfile = () => {
    const dispatch = useDispatch();
    const { profileImage, name, username, location, isSubmitting, loading } = useSelector((state) => state.profile)
    const { data: session, status } = useSession();
    const [isProfileFetched, setIsProfileFetched] = useState(false);

    const [inputValues, setInputValues] = useState({
        name: '',
        username: '',
        location: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        if (session?.user?.id && !isProfileFetched) {
            dispatch(fetchProfileData(session.user.id));
            setIsProfileFetched(true);
        }
    }, [session?.user?.id, dispatch, isProfileFetched]);

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
            toast.error("You must be logged in to edit your profile");
            return;
        }

        const updatedData = {
            name: inputValues.name || name,
            username: inputValues.username || username,
            location: inputValues.location || location,
            profileImage: profileImage
        }

        dispatch(updateUserRole({ userId: session.user.id, profileData: updatedData }))


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
                                    src={selectedImage || profileImage || profileImage}
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
                                <h3>{name}</h3>
                                <p>{username}</p>
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
