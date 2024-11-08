'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styles from "./googleMap.module.css";
import Image from 'next/image';
import verified from "../../../../../public/new_releases.svg";
import location from "../../../../../public/location_on.svg";
import { darkThemeStyles, lightThemeStyles } from "../../../../mapTheme/mapTheme"



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

    const createCustomMarkerBitmap = async ({
        imagePath,
        stemLength = 20,
        stemWidth = 28,
        stemOffset = 10,
        glowSize = 3,
        glowSpread = 3,
        imageScale = 40,
        pinRoundness = 10,
        glowColor = '#D76020',
        stemColor = '#D76020',
    }) => {
        const image = await loadImage(imagePath);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const padding = glowSize;
        const markerSize = { width: 120, height: 150 + stemLength + padding };

        canvas.width = markerSize.width;
        canvas.height = markerSize.height;

        // Draw the glow effect
        context.fillStyle = glowColor;
        context.globalAlpha = 0.5;
        context.beginPath();
        const glowRadius = imageScale / 2 + glowSize;
        context.arc(markerSize.width / 2, markerSize.height / 2 + padding, glowRadius, 0, 2 * Math.PI);
        context.fill();
        context.globalAlpha = 1;

        // Draw the image
        context.save();
        const imageX = (markerSize.width - imageScale) / 2;
        const imageY = (markerSize.height - imageScale) / 2;
        context.beginPath();
        context.arc(markerSize.width / 2, markerSize.height / 2 + padding, imageScale / 2, 0, 2 * Math.PI);
        context.clip();
        context.drawImage(image, imageX, imageY, imageScale, imageScale);
        context.restore();

        // Draw the stem
        const baseY = glowRadius + padding - stemOffset;
        const tipY = baseY + stemLength;
        const halfWidth = stemWidth / 2;

        context.fillStyle = stemColor;
        context.beginPath();
        context.moveTo(markerSize.width / 2 - halfWidth, baseY);
        context.quadraticCurveTo(markerSize.width / 2, baseY - 12, markerSize.width / 2 + halfWidth, baseY);
        context.lineTo(markerSize.width / 2, tipY);
        context.closePath();
        context.fill();

        return canvas.toDataURL('/marker.png');
    };

    const loadImage = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
        });
    };

    useEffect(() => {
        const loadMarkers = async () => {
            const icons = {};
            for (const artist of artists) {
                icons[`${artist.location},${artist.location}`] = await createCustomMarkerBitmap('/marker.png');
            }
            setMarkerIcons(icons);
            console.log(icons);

        };

        if (artists.length > 0) {
            loadMarkers();
        }
    }, [artists]);

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