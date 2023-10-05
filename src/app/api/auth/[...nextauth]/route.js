import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import Users from "@/models/user/userSchema";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                await mongoose.connect(process.env.MONGO_URL);
                const { email, password } = credentials;
                const user = await Users.findOne({ email: email });
                if (!user) {
                    return null;//indicates not found
                }
                const passwordCompare = await bcrypt.compare(password, user.password);
                if (!passwordCompare) {
                    return null;
                }
                return {
                    email: user.email,
                    name: user.name,
                    username: user.username
                };//this will be found in session as user
            }
        }),
        // ...add more providers here
    ],
}


export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };