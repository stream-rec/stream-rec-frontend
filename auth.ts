import type {AuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/lib/data/user/user-apis";


interface JwtUser extends User {
  token: string
}


export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({token, user, account, profile, isNewUser}) {
      // console.log("jwt token", token)
      // console.log("jwt user", user)
      // console.log("jwt account", account)
      const loggedUser = user as JwtUser
      if (user) {
        token.accessToken = loggedUser.token
      }
      return token
    },
    async session({session, token, user}) {
      // console.log("session session", session)
      // console.log("session token", token)
      // console.log("session user", user)
      if (token) {
        session.user = {
          // @ts-ignore
          id: token.name,
          role: 'user',
          // @ts-ignore
          jwt: token.accessToken!!
        }
      }
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          try {
            const res = await login(credentials.username, credentials.password)
            if (res.token) {
              return {
                id: credentials.username,
                name: credentials.username,
                email: '',
                token: res.token
              } as JwtUser
            }
            return null
          } catch (e) {
            console.error(e)
            return null
          }
        } else {
          return null
        }
      },
    })
  ],
  session: {strategy: "jwt", maxAge: 2 * 24 * 60 * 60}
}
