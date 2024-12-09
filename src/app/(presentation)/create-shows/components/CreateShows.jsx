import React, { useState, useRef } from 'react'
import styles from "./createShows.module.css"
import Image from 'next/image'
import penBorder from "../../../../../public/border_color.svg"
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { toast } from "react-toastify"
import { useSession } from 'next-auth/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from 'framer-motion'
import { useFormik } from 'formik';
import * as Yup from 'yup';

let libraries = ['places'];

const genres = [
    'Blues', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 'Hip-Hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'Reggae', 'R&B', 'Rock', 'Soul'
]


const CreateShows = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const { data: session } = useSession();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const autocompleteRef = useRef(null);

    // Formik validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        bio: Yup.string().required('Bio is required'),
        location: Yup.string().required('Location is required'),
        date: Yup.date().required('Date is required'),
        time: Yup.date().required('Time is required'),
        genres: Yup.array().min(1, 'At least one genre is required').required(),
        image: Yup.mixed().required('Image is required'),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: '',
            bio: '',
            location: '',
            latitude: '',
            longitude: '',
            date: null,
            time: null,
            genres: [],
            image: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                if (!imageFile) {
                    toast.error("Please upload an image.");
                    return;
                }

                const imageUrl = await uploadImageToCloudinary();
                const payload = {
                    ...values,
                    genres: selectedGenres,
                    date: new Date(values.date).toISOString().split("T")[0],
                    time: new Date(values.time).toISOString(),
                    image: imageUrl,
                    userId: session?.user?.id,
                };

                const response = await fetch("/api/shows", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                console.log("Show Response", response);


                if (response.ok) {
                    toast.success("Show created successfully!");
                    formik.resetForm();
                    setSelectedGenres([]);
                    setSelectedImage(null);
                    setSelectedLocation(null);
                } else {
                    toast.error("Failed to create show.");
                }
            } catch (error) {
                console.error("Error in handleSubmit:", error);
                toast.error("Error creating show.");
            }
        },
    });


    const uploadImageToCloudinary = async () => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'band_wagon');

        const response = await fetch('https://api.cloudinary.com/v1_1/dx0rctl2g/image/upload', {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to upload image: ${data.error.message}`);
        }
        return data.secure_url;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleGenreClick = (genre) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
        formik.setFieldValue(
            'genres',
            selectedGenres.includes(genre)
                ? selectedGenres.filter((g) => g !== genre)
                : [...selectedGenres, genre]
        );
    };


    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            formik.setFieldValue('location', place.formatted_address);
            formik.setFieldValue('latitude', lat);
            formik.setFieldValue('longitude', lng);
            setSelectedLocation({ lat, lng });
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.mid_section}>
                <form className={styles.create_page_container} onSubmit={formik.handleSubmit}>
                    <h3 className='heading_3_regular'>Create Show</h3>

                    <div className={styles.image_upload_box}>
                        <label htmlFor="image" className={styles.upload_label}>
                            {selectedImage ? (
                                <Image
                                    src={selectedImage}
                                    alt="Uploaded photo"
                                    width={200}
                                    height={200}
                                    className={styles.uploaded_image}
                                />
                            ) : (
                                <Image
                                    src={penBorder}
                                    alt="Upload photo"
                                    className={styles.default_image}
                                />
                            )}
                        </label>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => {
                                handleImageChange(e);
                                formik.setFieldValue('image', e.target.files[0]);
                            }}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                    {formik.touched.image && formik.errors.image && <p className="error">{formik.errors.image}</p>}
                    <div className={styles.name_box}>
                        <div>
                            <p className='p_small_regular'>Name</p>
                        </div>
                        <div className={styles.input_box}>
                            <input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Andy"
                            />
                            {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className={styles.bio_box}>
                        <div>
                            <span className='p_small_regular'>Bio</span>
                        </div>
                        <div className={styles.input_box}>
                            <input
                                type="text"
                                name="bio"
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="It is a long established fact"
                            />
                            {formik.touched.bio && formik.errors.bio && <p className="error">{formik.errors.bio}</p>}
                        </div>
                    </div>

                    {/* Location */}
                    <div className={styles.location_box}>
                        <div>
                            <span className="p_small_regular">Location</span>
                        </div>
                        <div className={styles.input_box}>
                            <Autocomplete
                                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                onPlaceChanged={handlePlaceSelect}
                                options={{ componentRestrictions: { country: 'PK' } }}
                            >
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Search location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Autocomplete>
                            {formik.touched.location && formik.errors.location && (
                                <p className="error">{formik.errors.location}</p>
                            )}
                        </div>
                    </div>

                    {/* Map to show selected location */}
                    <div className={styles.map_box}>
                        {selectedLocation && (
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '400px' }}
                                zoom={15}
                                center={selectedLocation}
                            >
                                <Marker position={selectedLocation} />
                            </GoogleMap>
                        )}
                    </div>

                    {/* Date */}
                    <div className={styles.date_box}>
                        <div>
                            <span className='p_small_regular'>Date</span>
                        </div>
                        <div className={styles.input_box}>
                            <DatePicker
                                selected={formik.values.date}
                                onChange={(date) => formik.setFieldValue('date', date)}
                                dateFormat="yyyy-MM-dd"
                                className={styles.date}
                                placeholderText="Select Date"
                            />
                            {formik.touched.date && formik.errors.date && <p className="error">{formik.errors.date}</p>}
                        </div>
                    </div>

                    {/* Time */}
                    <div className={styles.time_box}>
                        <div>
                            <span className='p_small_regular'>Time</span>
                        </div>
                        <div className={styles.input_box}>
                            <DatePicker
                                selected={formik.values.time}
                                onChange={(time) => formik.setFieldValue('time', time)}
                                showTimeSelect
                                showTimeSelectOnly
                                dateFormat="h:mm aa"
                                placeholderText="Select Time"
                            />
                            {formik.touched.time && formik.errors.time && <p className="error">{formik.errors.time}</p>}
                        </div>
                    </div>
                    <div className={styles.genre_dropdown} ref={dropdownRef}>
                        <div
                            className={`${styles.genre_dropdown__header} ${isOpen ? 'open' : ''}`}
                            onClick={toggleDropdown}
                        >
                            <div className={styles.genre_dropdown__header_content}>
                                <span className={styles.genre_dropdown__label}>Genres</span>
                                <span className={styles.genre_dropdown__selection}>
                                    {selectedGenres.length > 0 ? selectedGenres.join(', ') : 'Select genres'}
                                </span>
                            </div>
                            <motion.span
                                className={styles.genre_dropdown__arrow}
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            ></motion.span>
                        </div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    className={styles.genre_dropdown__content}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className={styles.genre_dropdown__list}>
                                        {genres.map((genre) => (
                                            <motion.div
                                                key={genre}
                                                className={`${styles.genre_dropdown__item} ${selectedGenres.includes(genre) ? styles.selected : ''
                                                    }`}
                                                onClick={() => handleGenreClick(genre)}
                                                whileHover={{ backgroundColor: '#1ED760' }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span>{genre}</span>
                                                {selectedGenres.includes(genre) && (
                                                    <motion.span
                                                        className={styles.genre_dropdown__item_remove}
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                    ></motion.span>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {formik.touched.genres && formik.errors.genres && (
                        <p className="error">{formik.errors.genres}</p>
                    )}

                    {/* Submit Button */}
                    <div className={styles.btn_box}>
                        <button type='submit' >
                            {'Create Show'}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateShows