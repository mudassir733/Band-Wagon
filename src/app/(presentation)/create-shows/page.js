"use client"
import React from 'react'
import Layout from "./Layout"
import ParentLayout from "../shared/Layout/ParentLayout"


const page = () => {
    return (
        <div>
            <ParentLayout>
                <Layout />
            </ParentLayout>
        </div>
    )
}

export default page