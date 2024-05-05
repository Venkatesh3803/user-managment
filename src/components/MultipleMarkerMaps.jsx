import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Pin from './Pin';


const MultipleMap = ({ data }) => {
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyA3thvgR7Kg8S5oUNNcl4jfkRa5WlE6iVw',
    });


    let defaultCenter = {
        lat: parseFloat(data[0]?.latitude),
        lng: parseFloat(data[0]?.longitude),
    };

    if (!isLoaded) return <h1>Loading...</h1>
    return <h1>

        <GoogleMap
            center={defaultCenter}
            zoom={7}
            mapContainerStyle={{ width: '100%', height: '100vh' }}
            options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
        >
            {data?.map((loc, i) => {
                return (
                   <Pin key={i} location = {loc}/>
                )
            })}
            {/* Map components, such as markers, can be added here */}
        </GoogleMap >
    </h1>
};


export default MultipleMap