import type {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/lib/data/user/user-apis";


export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({token, user, account, profile, isNewUser}) {
      // console.log("jwt token", token)
      // console.log("jwt user", user)
      // console.log("jwt account", account)
      return token
    },
    async session({session, token}) {
      // console.log("session session", session)
      // console.log("session token", token)
      return session
    }
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
              return {id: credentials.username, name: credentials.username, email: res.token, token: res.token}
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
