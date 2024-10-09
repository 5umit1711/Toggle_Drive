import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect() {
      return "/https://vercel.com/5umit1711s-projects/toggle-drive-5b1i";
    },
  },
});

export { handler as GET, handler as POST };
