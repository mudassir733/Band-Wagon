'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styles from "./googleMap.module.css";
import Image from 'next/image';
import verified from "../../../../../public/new_releases.svg";
import location from "../../../../../public/location_on.svg";
import { darkThemeStyles, lightThemeStyles } from "../../../../mapTheme/mapTheme"
import { createCustomMarkerBitmap } from '../../../../utils/customMarkerUtils';



const containerStyle = {
    width: '100%',
    height: '100vh',
};

const defaultCenter = { lat: 30.3753, lng: 69.3451 };






const imagePath = '/marker.png';

const GoogleMaps = ({ shows, allShows }) => {
    const [map, setMap] = useState(null);
    const [artists, setArtists] = useState([]);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [markerIcons, setMarkerIcons] = useState({});


    const displayShows = shows.length > 0 ? shows : allShows;

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback((mapInstance) => {
        setMap(null);
    }, []);




    useEffect(() => {
        const generateMarkerIcons = async () => {
            const icons = {};
            for (const show of displayShows) {
                const icon = await createCustomMarkerBitmap({
                    imagePath: '/Artist.png',
                    glowSize: 5,
                    glowColor: "rgba(255, 0, 0, 0.7)",
                });
                icons[`${show.latitude},${show.longitude}`] = icon;
            }
            setMarkerIcons(icons);
        };

        if (displayShows.length > 0) {
            generateMarkerIcons();
        }
    }, [displayShows]);

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };


    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div className={styles.mapContainer}>
                <button onClick={toggleTheme} className={styles.btn}>
                    {isDarkTheme ? 'Light' : 'Dark'}
                </button>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={
                        activeMarker
                            ? {
                                lat: activeMarker.position?.lat || defaultCenter.lat,
                                lng: activeMarker.position?.lng || defaultCenter.lng
                            }
                            : defaultCenter
                    }
                    zoom={9}
                    options={{
                        styles: isDarkTheme ? darkThemeStyles : lightThemeStyles,
                    }}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {displayShows.map((show, index) => (
                        <Marker
                            key={`show-${index}`}
                            position={{ lat: show.latitude, lng: show.longitude }}
                            icon={{
                                url: markerIcons[`${show.latitude},${show.longitude}`],
                                scaledSize: new google.maps.Size(60, 60),
                            }}
                        />
                    ))}



                    <div className={styles.infoWindowContent}>
                        <div className={styles.model}>
                            <div className={styles.model_flex}>
                                <div className={styles.left_col}>
                                    <Image
                                        src={'/default_profile.png'}
                                        className={styles.img}
                                        width={100}
                                        height={100}
                                        alt="Profile Image"
                                    />
                                </div>
                                <div className={styles.right_col}>
                                    <div className={styles.title}>
                                        <h1>Name</h1>
                                        <Image src={verified} alt="Verified Icon" />
                                    </div>
                                    <div className={styles.info_artist}>
                                        <div className={styles.flex_box}>
                                            <Image src={location} alt="Location Icon" />
                                            <p>Location</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </GoogleMap>
            </div>
        </LoadScript >
    );
};

export default GoogleMaps;