import React from 'react'
import ArtistProfile from './components/ArtistProfile'
import Header from "../shared/header/Header"

const Layout = () => {
    return (
        <div>
            <Header />
            <ArtistProfile />
        </div>
    )
}

export default Layout