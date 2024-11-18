This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.












// Update Profile
<!-- export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async ({ userId, profileData }, { rejectWithValue }) => {
        try {
            const { data } = await userService.updateProfile(userId, profileData);
            console.log("Profile updated successfully:", data.user);
            return data.user;
        } catch (error) {
            const errorMessage = handleApiError(error);
            return rejectWithValue(errorMessage);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileImage: '',
        profile: '',
        name: '',
        username: '',
        location: '',
        role: 'user',
        isSubmitting: false,
        status: 'idle',
        loading: false,
        error: null,
    },
    reducers: {
        // Existing reducers
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
                state.loading = false;
                state.error = action.payload;
            })
            // Update Profile Reducers
            .addCase(updateProfile.pending, (state) => {
                state.isSubmitting = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                const { name, username, location, profileImage } = action.payload;
                state.name = name;
                state.username = username;
                state.location = location;
                state.profileImage = profileImage;
                state.isSubmitting = false;
                toast.success("Profile updated successfully!");
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isSubmitting = false;
                state.error = action.payload;
                toast.error("Failed to update profile.");
            });
    },
}); -->

