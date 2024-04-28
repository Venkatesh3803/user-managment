import React from 'react'
import UserList from '../components/UserList'
import Hero from '../components/Hero'


const HomePage = () => {
    return (
        <div>
            <Hero />
            <UserList homepage />
        </div>
    )
}

export default HomePage
