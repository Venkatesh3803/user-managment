import React, { useContext } from 'react'
import Footer from '../components/Footer'
import Navber from '../components/Navber'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../contextApi/AuthContext'

const Layout = () => {
    return (
        <div>
            <Navber />
            <Outlet />
            <Footer />
        </div>
    )
}
const ProtectedRoute = () => {
    const { currUser } = useContext(AuthContext)
    if (!currUser) return <Navigate to="/signin" />;
    return (
        <div>
            <Navber />
            <Outlet />
            <Footer />
        </div>
    )
}
const AdminRoute = () => {
    const { currUser } = useContext(AuthContext)
    if (!currUser.admin) return <Navigate to="/signin" />;
    return (
        <div>
            <Navber />
            <Outlet />
            <Footer />
        </div>
    )
}

export { Layout, ProtectedRoute, AdminRoute };
