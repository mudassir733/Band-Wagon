import User from "../../../models/user.model.js";
import connect from "../../../utils/db/connect.js";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { signIn } from "next-auth/react"


export const POST = async (req) => {
    try {
        const { username, email, password, name, location } = await req.json();


        if (!username || !email || !password) {
            return new NextResponse("Missing fields", { status: 400 });
        }


        await connect();

        const existUser = await User.findOne({ email });

        if (existUser) {
            return new NextResponse("The email already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name,
            location,
        });

        await newUser.save();



        // Automatically sign in the user after successful sign up
        const signInResponse = await signIn("credentials", {
            redirect: false,  // prevent redirect
            email,
            password,
        });

        if (signInResponse.error) {
            console.error("Sign-in error:", signInResponse.error);
            return NextResponse.json({ message: "User created, but failed to log in" }, { status: 201 });
        }
        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });

    } catch (error) {
        console.error("Error in user creation:", error.message);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
};







