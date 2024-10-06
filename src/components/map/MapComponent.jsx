import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import styles from "./map.module.css";

const MapComponent = () => {
    const mapRef = useRef();
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [placeDetails, setPlaceDetails] = useState(null);

    const markers = [
        {
            position: { lat: 48.7774, lng: 19.2451 },
            label: { text: 'Banská Bystrica', color: 'white' },
            iconType: 'location',
        },
        {
            position: { lat: 48.8567844, lng: 20.213108 },
            label: { text: 'Opera House', color: 'white' },
            iconType: 'location',
        },
        {
            position: { lat: 43.2651, lng: 19.2451 },
            label: { text: 'Taronga Zoo', color: 'white' },
            iconType: 'location',
        },
        {
            position: { lat: 42.8209738, lng: 19.2563253 },
            label: { text: 'Manly Beach', color: 'white' },
            iconType: 'location',
        },
        {
            position: { lat: 48.7123, lng: 19.1467 },
            label: { text: 'Person Marker', color: 'white' },
            iconType: 'person',
        },
    ];


    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });


    const getPlaceDetails = async () => {
        const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
        const { Place } = await google.maps.importLibrary('places');

        const place = new Place({
            id: 'ChIJN5Nz71W3j4ARhx5bwpTQEGg',
            requestedLanguage: 'en',
        });

        await place.fetchFields({
            fields: ['displayName', 'formattedAddress', 'location'],
        });

        console.log('Place Name:', place.displayName);
        console.log('Address:', place.formattedAddress);


        setPlaceDetails({
            displayName: place.displayName,
            formattedAddress: place.formattedAddress,
            location: place.location,
        });


        new AdvancedMarkerElement({
            map: mapRef.current,
            position: place.location,
            title: place.displayName,
        });
    };


    useEffect(() => {

        if (isLoaded && google && google.maps && mapRef.current) {
            getPlaceDetails();
        }
    }, [isLoaded]);


    const getIcon = (iconType) => {
        if (iconType === 'person') {
            return {
                url: '/Man.png',
                scaledSize: { width: 60, height: 60 },
                labelOrigin: new window.google.maps.Point(20, 60),
            };
        }
        return {
            url: '/Artist.svg',
            scaledSize: { width: 40, height: 40 },
            labelOrigin: new window.google.maps.Point(20, 50),
        };
    };

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading Google Maps...</div>;
    }

    return (
        <GoogleMap
            mapContainerClassName={styles.map_container}
            center={{ lat: 48.7774, lng: 19.2451 }}
            zoom={8}
            mapTypeId='roadmap'
            onLoad={(map) => (mapRef.current = map)}  // Store map reference
        >

            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    label={{
                        text: marker.label.text,
                        color: marker.label.color,
                        fontSize: "16px",
                    }}
                    icon={getIcon(marker.iconType)}
                    onClick={() => setSelectedMarker(marker.position)}
                />
            ))}


            {selectedMarker && (
                <InfoWindow
                    position={selectedMarker}
                    onCloseClick={() => setSelectedMarker(null)}
                >
                    <div>Custom Info Window</div>
                </InfoWindow>
            )}


            {placeDetails && (
                <>
                    <Marker
                        position={placeDetails.location}
                        title={placeDetails.displayName}
                    />
                    <InfoWindow
                        position={placeDetails.location}
                        onCloseClick={() => setPlaceDetails(null)}
                    >
                        <div>
                            <h3>{placeDetails.displayName}</h3>
                            <p>{placeDetails.formattedAddress}</p>
                        </div>
                    </InfoWindow>
                </>
            )}

        </GoogleMap>
    );
};

export default MapComponent;
