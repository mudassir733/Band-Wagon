import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../../app/(application)/services/user.service';
import { handleApiError } from "../../../utils/apiErrorHandling"


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



const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileImage: '',
        name: '',
        username: '',
        role: '',
        loading: true,
        error: null,
    },
    reducers: {},
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
                state.role = action.payload.role || '';
                state.loading = false;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;