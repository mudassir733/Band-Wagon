import User from "../../../models/user.model";
import connect from "../../../utils/db/connect.js";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return new NextResponse("Missing fields", { status: 400 });
        }
        console.log(username, email, password);

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
        });

        await newUser.save();
        return new NextResponse("User created successfully", { status: 201 });

    } catch (error) {
        console.error("Error in user creation:", error.message);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
};
