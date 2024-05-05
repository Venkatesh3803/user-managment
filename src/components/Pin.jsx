import { InfoWindow, Marker } from '@react-google-maps/api'
import React, { useState } from 'react'

const Pin = ({ location }) => {
    const [mark, setMart] = useState("")
    return (
        <div>
            <Marker onMouseOver={() => setMart(location)} position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }} />
            {mark && (
                <InfoWindow
                    position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
                    onCloseClick={() => setMart(null)}
                >
                    <div className="flex items-center gap-2">
                        <img src={mark.profile} className = "w-8 h-8 rounded-lg object-cover"alt="" />
                        <div>{mark.firstname} {mark.lastname}</div>
                    </div>
                </InfoWindow>
            )}
        </div >
    )
}

export default Pin
