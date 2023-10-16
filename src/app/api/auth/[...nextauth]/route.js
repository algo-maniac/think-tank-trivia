import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import Users from "@/models/user/userSchema";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials, req) {
                await mongoose.connect(process.env.MONGO_URL);
                const { email, password } = credentials;
                const user = await Users.findOne({ email: email });
                if (!user) {
                    // mongoose.disconnect();
                    return null;//indicates not found
                }
                const passwordCompare = await bcrypt.compare(password, user.password);
                if (!passwordCompare) {
                    // mongoose.disconnect();
                    return null;
                }
                // mongoose.disconnect();
                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    image: user.avatar
                };//this will be found in session as user
            }
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            await mongoose.connect(process.env.MONGO_URL);
            if (account) {//signing in
                if (account.provider == "google" || account.provider == "github") {
                    //user={id,name,email,image}
                    const email = user.email;
                    const doc = await Users.findOne({ email: email });
                    if (!doc) {
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(process.env.DUMMY_PASSWORD, salt);
                        str=user.email;
                        list = str.split('@');
                        domain = list[1].split('.');
                        username = list[0] + '_' + domain[0];
                        // console.log(username);
                        const newUser = new Users({ name: user.name, email: user.email, username: username, password: hashedPassword, avatar: user.image })
                        await newUser.save();
                    }
                }
            }
            // console.log("session form jwt",session);
            return token;
        }
    }
}


export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };