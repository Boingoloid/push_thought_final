import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers: [{
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          },
    }],
    callbacks: {
        // Invoked on successful sign in
        async signIn({profile}) {
            // connect to db
            // check if user exists
            // if not then add user to database
            // return true to allow sign in
        }, //Modifies the session object
        async session({session}) {
            // Get user from database
            // Assign the user id to the session
            // return session
        }
    }
}