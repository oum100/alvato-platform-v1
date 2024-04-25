import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default NuxtAuthHandler({
    secret: useRuntimeConfig().AUTH_SECRET,

    pages:{
        signIn: "/login",
    },

    providers: [
        //@ts-expect-error
        GithubProvider.default({
            clientId:  useRuntimeConfig().public.GITHUB_CLIENT_ID,
            clientSecret: useRuntimeConfig().GITHUB_CLIENT_SECRET
        }),

        //@ts-expect-error
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                // username: { label: 'Email', type: 'email', placeholder: '(hint: jsmith@gmail.com)' },
                // password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
            },

            authorize (credentials:{email:string, password:string}) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
        
                const userInfo = { id: '1', name: 'J Smith', email: 'jsmith@gmail.com', password: 'hunter2',role:'admin' }
        
                if (credentials?.email === userInfo.email && credentials?.password === userInfo.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    // console.log(user)
                    const user = {
                        id:userInfo.id,
                        name:userInfo.name,
                        email: userInfo.email,
                        role: userInfo.role
                    }

                    // return user
                    return Promise.resolve(user)
                        
                    
                } else {
                    console.error('Warning: Malicious login attempt registered, bad credentials provided')
            
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
            
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }

            
        }),
    ],

    session:{
        strategy:"jwt",
    },

    callbacks:{
        // async jwt({token, user, account, profile}){

        //     return token
        // },

        // session({session,token}){
        //     return session
        // }


        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        jwt: async({token, user}) => {
            console.log("user1: ",user)
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.jwt = user ? (user as any).access_token || '' : '';
                token.id = user ? user.id || '' : '';
                token.role = user ? (user as any).role || '' : '';
            }
            // return Promise.resolve(token);
            console.log("user2: ",user)
            return token={
                ...token,
                ...user
            }
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({session, token}) => {
            (session as any).role = token.role;
            (session as any).uid = token.id;
            return Promise.resolve(session);
        },
    }
})