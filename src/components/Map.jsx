import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const Map = ({ data }) => {
    const [lat] = useState(data && data.latitude)
    const [lng] = useState(data && data.longitude)

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    let defaultCenter = {
        lat: 28.644800,
        lng: 77.216721
    };

    console.log(typeof (parseFloat(lat), parseFloat(lng)))

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyA3thvgR7Kg8S5oUNNcl4jfkRa5WlE6iVw"
            >
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={10}
                    center={data !== "" ? [parseFloat(lat), parseFloat(lng)] : defaultCenter}
                >
                    {/* Child components, such as markers, can be added here */}
                    <Marker
                        position={[data.latitude, data.longitude]}
                        title={"myname"}
                    />
                </GoogleMap>
            </LoadScript>


        </>
    );
};


export default Map