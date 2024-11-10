import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from "../../../app/(application)/services/user.service"
import { handleApiError } from "../../../utils/apiErrorHandling"
import { toast } from "react-toastify"

export const fetchProfileData = createAsyncThunk(
    'profileHeader/fetchProfile',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await userService.getProfile(userId);
            return data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateUserRole = createAsyncThunk(
    'profileHeader/updateRole',
    async ({ userId, newRole }, { rejectWithValue }) => {
        try {
            const { data } = await userService.updateRole(userId, newRole);
            return data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            return rejectWithValue(errorMessage);
        }
    }
);

const initialState = {
    profileImage: '',
    profile: '',
    role: 'user',
    isRoleUpdating: false,
    isExpanded: false,
    searchTerm: '',
    recentSearches: [
        { name: 'Allen Ruppersberg', image: '/andy.svg' },
        { name: 'Andy Warhol', image: '/andy.svg' },
        { name: '555 55th St N, State Zip' },
        { name: 'BandWagon, 555 55th St N, City St...' }
    ],
    status: 'idle',
    error: null
};

const profileSlice = createSlice({
    name: 'profileHeader',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setIsExpanded: (state, action) => {
            state.isExpanded = action.payload;
        },
        clearRecentSearch: (state, action) => {
            state.recentSearches = state.recentSearches.filter((_, i) => i !== action.payload);
        },
        resetSearch: (state) => {
            state.isExpanded = false;
            state.searchTerm = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profileImage = action.payload.profileImage || '';
                state.role = action.payload.role || 'user';

            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateUserRole.pending, (state) => {
                state.isRoleUpdating = true;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.isRoleUpdating = false;
                state.role = action.payload.role;

                toast.success(`Role updated to ${action.payload.role}`);
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.isRoleUpdating = false;
                state.error = action.payload;
                toast.error(`Error updating role to ${action.payload.role}`);
            });
    }
});

export const {
    setSearchTerm,
    setIsExpanded,
    clearRecentSearch,
    resetSearch
} = profileSlice.actions;

export default profileSlice.reducer;