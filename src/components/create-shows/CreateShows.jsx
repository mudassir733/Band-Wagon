import React, { useState } from 'react'
import styles from "./createShows.module.css"
import Image from 'next/image'
import penBorder from "../../../public/border_color.svg"
import MapComponent from '../map/MapComponent'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import { toast } from "react-toastify"

const libraries = ['places'];
const CreateShows = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [showData, setShowData] = useState({
        name: '',
        bio: '',
        location: '',
        latitude: '',
        longitude: '',
        date: '',
        time: '',
        genres: [],
        image: '',
    });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShowData({ ...showData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleGenreChange = (e) => {
        const selectedGenres = Array.from(e.target.selectedOptions, option => option.value);
        setShowData({ ...showData, genres: selectedGenres });
    };

    const uploadImageToCloudinary = async () => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'band_wagon');

        const response = await fetch('https://api.cloudinary.com/v1_1/dx0rctl2g/image/upload', {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        console.log(data);


        if (!response.ok) {
            throw new Error(`Failed to upload image: ${data.error.message}`);
        }
        return data.secure_url;


    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            alert('Please upload an image');
            return;
        }

        setLoading(true);

        try {
            const imageUrl = await uploadImageToCloudinary();

            const response = await fetch('/api/shows', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...showData,
                    image: imageUrl,
                }),
            });


            const responseData = await response.json();

            if (response.ok) {
                toast.success('Show created successfully!');
                console.log('Response:', responseData);
            } else {
                toast.error('Failed to create show');
                console.error('Response:', responseData);
            }

        } catch (error) {
            console.error('Error creating show:', error);
            toast.error('Error creating show');
        } finally {
            setLoading(false);
        }
    };
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };


    const handlePlaceSelect = (place) => {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setShowData((prevData) => ({
            ...prevData,
            location: place.formatted_address,
            latitude: lat,
            longitude: lng,
        }));
        setSelectedLocation({ lat, lng });
    };
    if (!isLoaded) return <div>Loading...</div>;
    return (
        <div className={styles.container}>
            <div className={styles.mid_section}>
                <div className={styles.create_page_container}>
                    <h3 className='heading_3_regular'>Create Show</h3>

                    {/* Image Upload */}
                    <div className={styles.image_upload_box}>
                        <div>
                            <Image src={penBorder} alt="Upload" />
                        </div>
                        <input type="file" onChange={handleImageChange} />
                    </div>

                    {/* Name */}
                    <div className={styles.name_box}>
                        <div>
                            <p className='p_small_regular'>Name</p>
                        </div>
                        <div className={styles.input_box}>
                            <input
                                type="text"
                                name="name"
                                value={showData.name}
                                onChange={handleInputChange}
                                placeholder="Andy"
                            />
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
                                value={showData.bio}
                                onChange={handleInputChange}
                                placeholder="It is a long established fact"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className={styles.location_box}>
                        <div>
                            <span className="p_small_regular">Location</span>
                        </div>
                        <div className={styles.input_box}>
                            <Autocomplete
                                onPlaceChanged={() => handlePlaceSelect(autocomplete.getPlace())}
                                options={{
                                    componentRestrictions: { country: 'PK' }
                                }}
                            >
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Search location"
                                    value={showData.location}
                                    onChange={handleInputChange}
                                />
                            </Autocomplete>
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
                            <input
                                type="date"
                                name="date"
                                value={showData.date}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Time */}
                    <div className={styles.time_box}>
                        <div>
                            <span className='p_small_regular'>Time</span>
                        </div>
                        <div className={styles.input_box}>
                            <input
                                type="time"
                                name="time"
                                value={showData.time}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className={styles.genre_box} onClick={toggleDropdown}>
                        <div>
                            <span className='p_small_regular'>Genres</span>
                        </div>


                        <div className={styles.selected_genres}>
                            {showData.genres.length > 0 ? (
                                <span>{showData.genres.join(', ')}</span>
                            ) : (
                                <span className={styles.placeholder}>Select genres</span>
                            )}
                        </div>

                        {isDropdownVisible && (
                            <div className={styles.input_box}>
                                <select
                                    id="genres"
                                    name="genres"
                                    multiple
                                    value={showData.genres}
                                    onChange={handleGenreChange}
                                    className={styles.select_box}
                                >
                                    <option value="Blues">Blues</option>
                                    <option value="Classical">Classical</option>
                                    <option value="Country">Country</option>
                                    <option value="EDM">EDM</option>
                                    <option value="Folk">Folk</option>
                                    <option value="Funk">Funk</option>
                                    <option value="Hip-Hop">Hip-Hop</option>
                                    <option value="Jazz">Jazz</option>
                                    <option value="Latin">Latin</option>
                                    <option value="Metal">Metal</option>
                                    <option value="Pop">Pop</option>
                                    <option value="Punk">Punk</option>
                                    <option value="Reggae">Reggae</option>
                                    <option value="R&B">R&B</option>
                                    <option value="Rock">Rock</option>
                                    <option value="Soul">Soul</option>
                                </select>
                            </div>
                        )}
                    </div>
                    {/* Map (Latitude & Longitude) */}
                    <div className={styles.map_box}>
                        <MapComponent />
                    </div>

                    {/* Submit Button */}
                    <div className={styles.btn_box}>
                        <button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Creating Show...' : 'Create Show'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateShows