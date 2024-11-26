"use client"
import React, { useEffect } from 'react'
import Header from "../header/Header"
import { useSelector, useDispatch } from "react-redux"
import { useSession } from 'next-auth/react'
import {
    fetchProfileData,
    updateUserRole,
    setSearchTerm,
    setIsExpanded,
    clearRecentSearch,
    resetSearch
} from "../../../../config/store/features/ProfileSlice/profileScreen"
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic';
import { toast } from "react-toastify"

const Sidebar = dynamic(() => import('../sidebar/Sidebar'), { ssr: false });

const ParentLayout = ({ children }) => {
    const { data: session, status } = useSession();
    const path = usePathname()
    const dispatch = useDispatch();


    const {
        profile,
        profileImage,
        role,
        isRoleUpdating,
        isExpanded,
        searchTerm,
        recentSearches
    } = useSelector(state => state.profile);


    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            dispatch(fetchProfileData(session.user.id));
        }
    }, [status, session, dispatch]);


    const handleRoleSwitch = async () => {
        if (!session?.user?.id) {
            toast.error('User session not found. Please log in.');
            return;
        }

        if (role === "artist") {
            toast.error("Please Logout to reset your Role");
            return;
        }

        const newRole = "artist";

        const response = await dispatch(updateUserRole({ userId: session.user.id, role: newRole }));

        if (response.meta.requestStatus === "fulfilled") {
            toast.success(`Role updated to ${newRole}`);
        }
    };


    const handleFocus = () => {
        dispatch(setIsExpanded(true));
    };

    const handleClose = () => {
        dispatch(resetSearch());
    };

    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleClearRecentSearch = (index) => {
        dispatch(clearRecentSearch(index));
    };


    return (
        <div>
            <Header onRoleChange={handleRoleSwitch} role={role} profileImage={profileImage} isRoleUpdating={isRoleUpdating} isExpanded={isExpanded} searchTerm={searchTerm} recentSearches={recentSearches} handleClose={handleClose} handleFocus={handleFocus} handleSearch={handleSearch} handleClearRecentSearch={handleClearRecentSearch} />
            {children}
            {path === "/artist-profile" || path === "/create-shows" ? null : <Sidebar role={role} />}

        </div>
    )
}

export default ParentLayout