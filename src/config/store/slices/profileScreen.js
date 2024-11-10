import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

export const fetchProfileData = createAsyncThunk(
    'profile/fetchProfileData',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/users/${userId}`);
            console.log("Profile screen", response?.data);

            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile data');
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