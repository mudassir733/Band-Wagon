"use client"
import React from 'react'
import Header from "../shared/header/Header"
import ArtistPageManagement from "./components/ArtistPageManagement"


const Layout = () => {
    return (
        <div>
            <Header />
            <ArtistPageManagement />
        </div>
    )
}

export default Layout