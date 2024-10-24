'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styles from "./map.module.css";
import person from "../../../public/Profile.svg";
import Image from 'next/image';
import verified from "../../../public/new_releases.svg";
import location from "../../../public/location_on.svg";
import { useSession } from 'next-auth/react';


const containerStyle = {
    width: '100%',
    height: '100vh',
};

const defaultCenter = {
    lat: 37.437041393899676,
    lng: -4.191635586788259,
};




const darkThemeStyles = [
    { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
    { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
    { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
    { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
    { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
    { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1b1b1b" }] },
    { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
    { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#373737" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] },
    { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#4e4e4e" }] },
    { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#3d3d3d" }] }
];

const lightThemeStyles = [
    { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
    { "featureType": "administrative.neighborhood", "stylers": [{ "visibility": "off" }] },
    { "featureType": "poi", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] },
    { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
    { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] },
    { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }
];


const imagePath = '/marker.png';

const GoogleMaps = () => {
    const { data: session } = useSession()
    const [map, setMap] = useState(null);
    const [artists, setArtists] = useState([]);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [markerIcons, setMarkerIcons] = useState({});
    const [Isprofile, setIsProfile] = useState({
        profileImage: "",
        location: "",
        name: "",
    })

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


    // Fetch artist data
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch('/api/users'); // Endpoint to fetch all artists with role 'artist'
                console.log(response);

                if (response.ok) {
                    const data = await response.json();
                    const artistData = data.filter((artist) => artist.role === 'artist');
                    setArtists(artistData);
                }
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        };

        fetchArtists();
    }, []);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div className={styles.mapContainer}>
                <button onClick={toggleTheme} className={styles.btn}>
                    {isDarkTheme ? 'Light' : 'Dark'}
                </button>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={defaultCenter}
                    zoom={12}
                    options={{
                        styles: isDarkTheme ? darkThemeStyles : lightThemeStyles,
                    }}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {artists.map((artist, index) => (
                        <Marker
                            key={index}
                            position={{ lat: artist.location, lng: artist.location }}
                            icon={markerIcons[`${artist.location.lat},${artist.location.lng}`]} // Use the loaded custom icon
                            onClick={() => setActiveMarker(artist)}
                        />
                    ))}

                    {activeMarker && (
                        <InfoWindow
                            position={{ lat: activeMarker.location.lat, lng: activeMarker.location.lng }}
                            onCloseClick={() => setActiveMarker(null)}
                        >
                            <div className={styles.model}>
                                <div className={styles.model_flex}>
                                    <div className={styles.left_col}>
                                        <Image src={activeMarker.profileImage || person} className={styles.img} width={100} height={100} />
                                    </div>
                                    <div className={styles.right_col}>
                                        <div className={styles.title}>
                                            <h1>{activeMarker.name}</h1>
                                            <Image src={verified} />
                                        </div>
                                        <div className={styles.info_artist}>
                                            <div className={styles.flex_box}>
                                                <div>
                                                    <Image src={location} />
                                                </div>
                                                <p>{activeMarker.location.name}</p>
                                            </div>
                                            {/* Additional info sections */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default GoogleMaps;