import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                //   console.log(credentials);
                //   console.log(credentials.value);
                //   console.log(req);
                // if (credentials.email!=="tonmoy@gmail.com"){
                //     return null;
                // }
                return { email: credentials.email };
            }
        }),
        // ...add more providers here
    ],
}


export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };