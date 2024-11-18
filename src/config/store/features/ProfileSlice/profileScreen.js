import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../../../app/(application)/services/user.service';
import { handleApiError } from "../../../../utils/apiErrorHandling"
import { toast } from "react-toastify"


export const fetchProfileData = createAsyncThunk(
    'profile/fetchProfileData',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await userService.getProfile(userId)
            console.log("Profile screen", data.user);
            return data.user
        } catch (error) {
            const errorMesage = handleApiError(error)
            return rejectWithValue(errorMesage);
        }
    }
);


// update role
export const updateUserRole = createAsyncThunk(
    'profile/updateRole',
    async ({ userId, newRole }, { rejectWithValue }) => {
        try {
            const { data } = await userService.updateRole(userId, newRole)
            console.log("Role updated", data.user);
            return data.user
        } catch (error) {
            const errorMesage = handleApiError(error)
            return rejectWithValue(errorMesage);
        }
    }
)

// Update Profile
// export const updateProfile = createAsyncThunk(
//     'profile/updateProfile',
//     async ({ userId, profileData }, { rejectWithValue }) => {
//         try {
//             const { data } = await userService.updateProfile(userId, profileData);
//             console.log("Profile updated successfully:", data.user);
//             return data.user;
//         } catch (error) {
//             const errorMessage = handleApiError(error);
//             return rejectWithValue(errorMessage);
//         }
//     }
// );



const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileImage: '',
        profile: '',
        name: '',
        isRoleUpdating: false,
        username: '',
        role: 'user',
        isSubmitting: false,
        isExpanded: false,
        error: null,
        status: "idle",
        searchTerm: '',
        recentSearches: [
            { name: 'Allen Ruppersberg', image: '/andy.svg' },
            { name: 'Andy Warhol', image: '/andy.svg' },
            { name: '555 55th St N, State Zip' },
            { name: 'BandWagon, 555 55th St N, City St...' }
        ],
        status: 'idle',
        error: null
    },
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
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                const { profileImage, name, username, location, role } = action.payload;
                state.profileImage = profileImage || '';
                state.name = name || '';
                state.username = username || '';
                state.location = location || '';
                state.role = role || 'user';
                state.loading = false;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.status = "Failed";
                state.loading = false;
                state.error = action.payload;
            }).addCase(updateUserRole.pending, (state) => {
                state.isRoleUpdating = true;
                state.isSubmitting = true;
            }).addCase(updateUserRole.fulfilled, (state, action) => {
                const { name, username, location, profileImage } = action.payload;
                state.isRoleUpdating = false;
                state.name = name;
                state.username = username;
                state.location = location;
                state.profileImage = profileImage;
                state.isSubmitting = false;
                if (state.isRoleUpdating === false) {
                    toast.success(`Role updated to ${state.role}`)
                } else {
                    toast.success("Profile updated successfully!");
                }


            }).addCase(updateUserRole.rejected, (state, action) => {
                state.isSubmitting = false;
                state.isRoleUpdating = false;
                state.error = action.payload;
                console.log("Error payload", state.error)

                toast.error(`Error updating the user role ${action.payload.role}`);
            });
    },
});

export const { setSearchTerm, setIsExpanded, clearRecentSearch, resetSearch } = profileSlice.actions;

export default profileSlice.reducer;