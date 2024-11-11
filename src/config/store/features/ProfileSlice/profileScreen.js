import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../../../app/(application)/services/user.service';
import { handleApiError } from "../../../../utils/apiErrorHandling"
import { toast } from "react-toastify"


export const fetchProfileData = createAsyncThunk(
    'profile/fetchProfileData',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await userService.getProfile(userId)
            console.log("Profile screen", data);
            return data
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
            console.log("Role updated", data);
            return data
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
        }
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
                state.role = action.payload.role;
                toast.success(`Role updated to ${state.role}`);
                console.log("Action payload", action.payload.role)

            }).addCase(updateUserRole.rejected, (state, action) => {
                state.isRoleUpdating = false;
                state.error = action.payload;
                console.log("Error payload", state.error)

                toast.error(`Error updating the user role ${action.payload.role}`);
            });
    },
});

export const { setSearchTerm, setIsExpanded, clearRecentSearch, resetSearch } = profileSlice.actions;

export default profileSlice.reducer;