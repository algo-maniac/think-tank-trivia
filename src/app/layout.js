import { Inter } from "next/font/google";

import SessionProvider from "./session-provider";
import { getServerSession } from "next-auth";
import UserState from "@/context/userContext/userState";
import mongoose from "mongoose";
import Users from "@/models/user/userSchema";
// import './globals.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
<<<<<<< HEAD
  title: "Think Tank Trivia",
=======
  title: "Think-Tank-Trivia",
>>>>>>> production
  description: "Generated by create next app",
  icons: {
    icon: '/favicon.png',
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  let user = null;
  if (session) {
    // console.log("session", session);
    // const response = await fetch(`http://localhost:3000/api/user/get-user-data/${session.user.email}`);
    // const data=await response.json();
    await mongoose.connect(process.env.MONGO_URL);
    const userDoc=await Users.findOne({email:session.user.email},{password:0,responses:0,forms:0});
    user=userDoc;
  }
  else{
    user="unauthenticated";
  }
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <UserState user={user}>
          <body className={inter.className}>{children}</body>
        </UserState>
      </SessionProvider>
    </html>
  );
}
