import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const MultipleMap = ({ data }) => {
    console.log(data)
    const [lat] = useState(data.length > 0 && data[0].latitude)
    const [lng] = useState(data.lenght > 0 && data[0].longitude)

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    let defaultCenter = {
        lat: 28.644800,
        lng: 77.216721
    };

    console.log(lat, lng)

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyA3thvgR7Kg8S5oUNNcl4jfkRa5WlE6iVw"
            >
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={10}
                    center={data.length === 0 ? [parseFloat(lat), parseFloat(lng)] : defaultCenter}
                >
                    {/* Child components, such as markers, can be added here */}
                    {data.map((item) => {
                        return (
                            <Marker
                                position={[item?.latitude, item?.longitude]}
                                title={item?.firstname}
                            />
                        )
                    })}
                </GoogleMap>
            </LoadScript>

        </>
    );
};


export default MultipleMap