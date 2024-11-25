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
    async ({ userId, role }, { rejectWithValue }) => {
        try {
            const { data } = await userService.updateRole(userId, role)
            console.log("Role updated", data.user);
            return data.user
        } catch (error) {
            const errorMesage = handleApiError(error)
            return rejectWithValue(errorMesage);
        }
    }
)


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileImage: '',
        profile: '',
        name: '',
        isRoleUpdating: false,
        username: '',
        role: 'user',
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
        },

        resetState: (state) => {
            state.role = 'user';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.profileImage = action.payload.profileImage || '';
                state.name = action.payload.name || '';
                state.username = action.payload.username || '';
                state.role = action.payload.role || 'user';
                state.loading = false;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.status = "Failed";
                state.loading = false;
                state.error = action.payload;
            }).addCase(updateUserRole.pending, (state) => {
                state.isRoleUpdating = true;
            }).addCase(updateUserRole.fulfilled, (state, action) => {
                state.isRoleUpdating = false;
                if (state.role === 'user' && action.payload.role === 'artist') {
                    state.role = action.payload.role;
                    console.log("Role successfully updated to", action.payload.role);
                } else if (state.role === 'artist') {
                    toast.error("Please Logout to reset your Role");
                    console.log("Role change from artist to user is not allowed in the same session.");
                } else {
                    console.log("No role change necessary.");
                }

            }).addCase(updateUserRole.rejected, (state, action) => {
                state.isRoleUpdating = false;
                state.error = action.payload;
                toast.error(`Error updating the user role ${action.payload.role} `);
                console.log("Error payload", state.error)
            });
    },
});

export const { setSearchTerm, setIsExpanded, clearRecentSearch, resetSearch, resetState } = profileSlice.actions;

export default profileSlice.reducer;